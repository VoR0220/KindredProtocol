import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BlackListed,
  FinalYieldDistribution,
  LoanTaken,
  PaymentMade,
  PoolRegistered
} from "../generated/KindredCore/KindredCore"

export function createBlackListedEvent(blacklistee: Address): BlackListed {
  let blackListedEvent = changetype<BlackListed>(newMockEvent())

  blackListedEvent.parameters = new Array()

  blackListedEvent.parameters.push(
    new ethereum.EventParam(
      "blacklistee",
      ethereum.Value.fromAddress(blacklistee)
    )
  )

  return blackListedEvent
}

export function createFinalYieldDistributionEvent(
  participants: Array<Address>,
  shares: Array<BigInt>
): FinalYieldDistribution {
  let finalYieldDistributionEvent = changetype<FinalYieldDistribution>(
    newMockEvent()
  )

  finalYieldDistributionEvent.parameters = new Array()

  finalYieldDistributionEvent.parameters.push(
    new ethereum.EventParam(
      "participants",
      ethereum.Value.fromAddressArray(participants)
    )
  )
  finalYieldDistributionEvent.parameters.push(
    new ethereum.EventParam(
      "shares",
      ethereum.Value.fromUnsignedBigIntArray(shares)
    )
  )

  return finalYieldDistributionEvent
}

export function createLoanTakenEvent(user: Address, amount: BigInt): LoanTaken {
  let loanTakenEvent = changetype<LoanTaken>(newMockEvent())

  loanTakenEvent.parameters = new Array()

  loanTakenEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  loanTakenEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return loanTakenEvent
}

export function createPaymentMadeEvent(
  user: Address,
  amount: BigInt,
  poolId: BigInt
): PaymentMade {
  let paymentMadeEvent = changetype<PaymentMade>(newMockEvent())

  paymentMadeEvent.parameters = new Array()

  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )

  return paymentMadeEvent
}

export function createPoolRegisteredEvent(
  poolId: BigInt,
  payAmount: BigInt,
  users: Array<Address>,
  dueDates: Array<BigInt>
): PoolRegistered {
  let poolRegisteredEvent = changetype<PoolRegistered>(newMockEvent())

  poolRegisteredEvent.parameters = new Array()

  poolRegisteredEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  poolRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "payAmount",
      ethereum.Value.fromUnsignedBigInt(payAmount)
    )
  )
  poolRegisteredEvent.parameters.push(
    new ethereum.EventParam("users", ethereum.Value.fromAddressArray(users))
  )
  poolRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "dueDates",
      ethereum.Value.fromUnsignedBigIntArray(dueDates)
    )
  )

  return poolRegisteredEvent
}
