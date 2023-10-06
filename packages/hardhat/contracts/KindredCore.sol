// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/interfaces/IERC4626.sol";

contract KindredCore {

	enum PoolStage {
		Uninitialized,
		Started,
		Finalized
	}

	struct PoolInfo {
		address[] participants;
		uint[] dueDates; // todo: convert due dates into lower bit timestamps
		bytes[] termsSignatures;
		bytes32 termsHash;
		uint256 payAmount;
		uint256 currentPot;
		uint256 expectedTermPot;
		uint256 latefee;
		uint256 shares;
		uint8 currentDueDate;
		PoolStage stage;
		IERC4626 vault;
		IERC20 token;
		address currentRecipient;
	}

	struct UserInfo {
		bool isBlacklisted;
		bool isParticipant;
	}

	mapping(uint256 poolId => PoolInfo) public pools;
	mapping(address partipants => mapping(uint poolId => UserInfo)) public users;
	mapping(address users => mapping(uint256 dueDate => bool)) public madePaymentsForDueDate;

	uint256 internal _poolCounter;

	event PoolRegistered(uint indexed poolId, uint indexed payAmount, address[] users, uint[] dueDates);
	event PaymentMade(address indexed user, uint indexed amount, uint indexed poolId);
	event LoanTaken(address indexed user, uint indexed amount);
	event BlackListed(address indexed blacklistee);
	event FinalYieldDistribution(address[] participants, uint[] shares, uint totalEarned);


	function register(bytes[] calldata _signatures, uint[] calldata _dueDates, bytes calldata _terms) external {
		(uint payAmount, uint lateFee, address vault, address _erc20Addr, bytes32 termsHash) = abi.decode(_terms, (uint64, uint64, address, address, bytes32));
		uint len = _signatures.length;
		require(len == _dueDates.length, "lengths must match");
		require(termsHash == keccak256(abi.encode(payAmount, lateFee, vault, _erc20Addr, _dueDates)), "terms don't align");
		++_poolCounter;

		uint counter = _poolCounter;
		
		address[] memory usersList = new address[](len);
		IERC20 token = IERC20(_erc20Addr);
		uint timeDiff = _dueDates[1] - _dueDates[0];

		// require that there's atleast one cycle of waiting to receive pay
		require(block.timestamp < _dueDates[0] && (_dueDates[0] - block.timestamp) >= timeDiff, "need atleast one cycle to wait");

		uint currentPot = payAmount * usersList.length;
		// Create a new PoolInfo struct
		PoolInfo memory newPool;
		{
			newPool.participants = usersList;
			newPool.dueDates = _dueDates;
			newPool.termsSignatures = _signatures;
			newPool.termsHash = termsHash;
			newPool.payAmount = payAmount;
			newPool.currentPot = currentPot;
			newPool.expectedTermPot = currentPot;
			newPool.latefee = lateFee;
			newPool.currentDueDate = 0;
			newPool.vault = IERC4626(vault);
			newPool.token = token;
			newPool.stage = PoolStage.Started;
		}


		for (uint i; i < len; ++i) {
			if (i > 0) {
				uint calcedTimeDiff = _dueDates[i] - _dueDates[i - 1];
				require(calcedTimeDiff == timeDiff, "dates are not equally spread");
			}
			address newUser = ECDSA.recover(termsHash, _signatures[i]);
			// assign pool
			UserInfo memory user = users[newUser][counter];
			user.isParticipant = true;
			require(token.transferFrom(newUser, address(this), payAmount), "transfer failed");
		}
		newPool.shares = newPool.vault.deposit(currentPot, address(this));
		// Add the new pool to the pools mapping
		pools[counter] = newPool;

		// Emit an event to indicate a new pool has been registered
		emit PoolRegistered(counter, payAmount, usersList, _dueDates);
	}

	function payPool(uint poolId) external {
		UserInfo memory user = users[msg.sender][poolId];
		PoolInfo memory pool = pools[poolId];
		require(user.isParticipant, "not registered to this pool");
		require(pool.stage == PoolStage.Started, "pool finalized or not started yet");
		require(!madePaymentsForDueDate[msg.sender][pool.dueDates[pool.currentDueDate]], "already paid");
		
		if (pool.dueDates[pool.currentDueDate] < block.timestamp) {
			pool.currentDueDate++;
		}
		
		uint payAmount;
		if (pool.currentDueDate > 0) {
			bool onTimePay = madePaymentsForDueDate[msg.sender][pool.currentDueDate - 1];
			if (onTimePay) {
				payAmount = pool.payAmount;
			} else {
				payAmount = pool.payAmount + pool.latefee;
				madePaymentsForDueDate[msg.sender][pool.currentDueDate - 1] = true;
			}
		}
		
		pool.currentPot += payAmount;
		madePaymentsForDueDate[msg.sender][pool.dueDates[pool.currentDueDate]] = true;
		bool success = pool.token.transferFrom(msg.sender, address(this), uint256(pool.payAmount));
		require(success, "transfer didn't work");
		uint shares = pool.vault.deposit(payAmount, address(this));
		pool.shares += shares;
		emit PaymentMade(msg.sender, payAmount, poolId);
	}

	function takeLoan(uint poolId) external {
		UserInfo memory user = users[msg.sender][poolId];
		PoolInfo memory pool = pools[poolId];
		require(!user.isBlacklisted, "blacklisted");
		require(pool.participants[pool.currentDueDate] == msg.sender, "it's not your turn");
		// everybody has to pay up for the next month in advance unless it's the last person
		if (pool.currentDueDate != pool.dueDates.length - 1) {
			require(pool.currentPot >= (pool.expectedTermPot * 2), "someone forgot to pay");
		} else {
			require(pool.currentPot >= pool.expectedTermPot, "someone forgot to pay");
			pool.stage = PoolStage.Finalized;
		}

		pool.currentPot -= pool.expectedTermPot;
		uint shares = pool.vault.withdraw(pool.currentPot, msg.sender, address(this));
		pool.shares -= shares;
		require(pool.token.transferFrom(address(this), msg.sender, uint256(pool.expectedTermPot)));
		emit LoanTaken(msg.sender, pool.expectedTermPot);
	}

	function addToBlacklist(uint poolId, address _user, bool _recalibrateLoan) external {
		UserInfo memory user = users[msg.sender][poolId];
		UserInfo memory userToBan = users[_user][poolId];
		PoolInfo memory pool = pools[poolId];
		require(user.isParticipant && userToBan.isParticipant, "not in the same pool");
		uint len = pool.dueDates.length;
		
		for (uint i; i < len; ++i) {
			if (!madePaymentsForDueDate[_user][pool.dueDates[i]]) {
				userToBan.isBlacklisted = true;
				break;
			}
		}
		// add in the steps to recalibrate the loan as a safety feature so that everyone picks up the slack for the thief
		if (_recalibrateLoan) {
			pool.payAmount += pool.payAmount + (pool.payAmount / pool.participants.length);
		} else {
			uint payAmount = pool.payAmount - (pool.payAmount / pool.participants.length);
			pool.expectedTermPot -= payAmount;
			pool.payAmount = payAmount;
		}
		pools[poolId] = pool; // add to storage

		users[_user][poolId] = userToBan; // add to storage
		emit BlackListed(_user);
	}

	function distributeYield(uint poolId, uint[] memory sharesDistribution) external {
		PoolInfo memory pool = pools[poolId];
		require(pool.stage == PoolStage.Finalized, "not finished yet");
		uint shares = pool.shares;

		address[] memory participants = pool.participants;
		address[] memory filterPartipicants = new address[](participants.length);
		for (uint i; i < participants.length; ++i) {
			UserInfo memory user = users[participants[i]][poolId];
			if (user.isBlacklisted) {
				continue;
			} 
			filterPartipicants[i] = participants[i];
		}
		require(filterPartipicants.length == sharesDistribution.length, "unequal share to participant length");
		IERC4626 vault = pool.vault;
		uint totalEarned = vault.previewRedeem(shares);
		uint sharesCounter;
		for (uint i; i < filterPartipicants.length; ++i) {
			uint usersShare = shares * sharesDistribution[i] / 100;
			vault.redeem(usersShare, filterPartipicants[i], address(this));
			sharesCounter += sharesDistribution[i];
		}
		require(sharesCounter == 100, "uneven shares");
		emit FinalYieldDistribution(filterPartipicants, sharesDistribution, totalEarned);
	}	
}