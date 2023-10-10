// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/interfaces/IERC4626.sol";


// notes
// DAI testnet address mumbai: 0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F
// DAI testnet address optimism: 0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1 

contract KindredCore {

	enum PoolStage {
		Uninitialized,
		Started,
		Finalized
	}

	struct PoolInfo {
		address[] participants;
		uint[] dueDates; // todo: convert due dates into lower bit timestamps
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
		bool inflationModeEnabled;
	}

	struct UserInfo {
		bool isBlacklisted;
		bool isParticipant;
	}

	mapping(uint256 poolId => PoolInfo) public pools;
	mapping(address partipants => mapping(uint poolId => UserInfo)) public users;
	mapping(address users => mapping(uint poolId => mapping(uint256 dueDate => bool))) public madePaymentsForDueDate;
	mapping(address user => uint[]) poolsParticipatingIn;

	uint256 internal _poolCounter;

	event PoolRegistered(uint indexed poolId, uint indexed payAmount, address[] users, uint[] dueDates);
	event PaymentMade(address indexed user, uint indexed amount, uint indexed poolId);
	event LoanTaken(address indexed user, uint indexed amount);
	event BlackListed(address indexed blacklistee);
	event FinalYieldDistribution(address[] participants, uint[] shares, uint totalEarned);

	function getPoolsParticipatingIn(address user) external view returns (uint256[] memory) {
		uint256[] memory poolIds = poolsParticipatingIn[user];
		return poolIds;
	}

	function generateDemoTimestamps() external view returns (uint[4] memory) {
		uint base = block.timestamp + 1 minutes;
		return [base, base * 2, base * 3, base * 4];
	}

	function isLate(address user, uint poolId) external view returns (bool) {
		PoolInfo memory pool = pools[poolId];
		if (block.timestamp >= pool.dueDates[pool.currentDueDate] && !madePaymentsForDueDate[user][poolId][pool.dueDates[pool.currentDueDate]]) {
			return true;
		}
		return false;
	}

	function register(PoolInfo calldata poolToRegister) external {
		require(poolToRegister.participants.length == poolToRegister.dueDates.length, "lengths must match");	
		require(address(poolToRegister.token) != address(0), "invalid token");
		require(address(poolToRegister.vault) != address(0), "invalid vault");

		uint timeDiff = poolToRegister.dueDates[1] - poolToRegister.dueDates[0];
		// require that there's atleast one cycle of waiting to receive pay
		require(block.timestamp < poolToRegister.dueDates[0] && (poolToRegister.dueDates[0] - block.timestamp) >= timeDiff, "need atleast one cycle to wait");
		require(poolToRegister.stage == PoolStage.Uninitialized, "should be uninitialized");
		require(poolToRegister.shares == 0, "shares should be 0");
		require(poolToRegister.currentPot == 0, "no funds in yet");
		require(poolToRegister.currentDueDate == 0, "current due date needs to be set to 0");
	
		++_poolCounter;

		uint counter = _poolCounter;
		// Create a new PoolInfo struct

		for (uint i; i < poolToRegister.dueDates.length; ++i) {
			if (i > 0) {
				uint calcedTimeDiff = poolToRegister.dueDates[i] - poolToRegister.dueDates[i - 1];
				require(calcedTimeDiff == timeDiff, "dates are not equally spread");
			}
			address newUser = poolToRegister.participants[i];
			// assign pool
			UserInfo memory user = users[newUser][counter];
			user.isParticipant = true;
			poolsParticipatingIn[newUser].push(counter);
		}
		// Add the new pool to the pools mapping
		pools[counter] = poolToRegister;
		pools[counter].stage = PoolStage.Started;

		// Emit an event to indicate a new pool has been registered
		emit PoolRegistered(counter, poolToRegister.payAmount, poolToRegister.participants, poolToRegister.dueDates);
	}

	function payPool(uint poolId) external {
		UserInfo memory user = users[msg.sender][poolId];
		PoolInfo memory pool = pools[poolId];
		require(user.isParticipant, "not registered to this pool");
		require(pool.stage == PoolStage.Started, "pool finalized or not started yet");
		
		if (pool.dueDates[pool.currentDueDate] < block.timestamp) {
			pool.currentDueDate++;
		}
		uint dueDate = pool.dueDates[pool.currentDueDate];
		require(!madePaymentsForDueDate[msg.sender][poolId][dueDate], "already paid");
		
		uint payAmount;

		uint previousDueDate = pool.dueDates[pool.currentDueDate - 1];
		if (pool.currentDueDate > 0) {
			bool onTimePay = madePaymentsForDueDate[msg.sender][poolId][previousDueDate];
			if (onTimePay) {
				payAmount = pool.payAmount;
			} else {
				payAmount = (pool.payAmount * 2) + pool.latefee; // might need to figure this out
				madePaymentsForDueDate[msg.sender][poolId][pool.currentDueDate - 1] = true;
			}
		}
		
		pool.currentPot += payAmount;
		madePaymentsForDueDate[msg.sender][poolId][pool.dueDates[pool.currentDueDate]] = true;
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
			if (!madePaymentsForDueDate[_user][poolId][pool.dueDates[i]]) {
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