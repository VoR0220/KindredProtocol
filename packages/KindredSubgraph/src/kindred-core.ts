import {
  BlackListed as BlackListedEvent,
  FinalYieldDistribution as FinalYieldDistributionEvent,
  LoanTaken as LoanTakenEvent,
  PaymentMade as PaymentMadeEvent,
  PoolRegistered as PoolRegisteredEvent
} from "../generated/KindredCore/KindredCore"
import {
  BlackListed,
  FinalYieldDistribution,
  LoanTaken,
  PaymentMade,
  PoolRegistered
} from "../generated/schema"
import {
  Bytes
} from "@graphprotocol/graph-ts";

export function handleBlackListed(event: BlackListedEvent): void {
  let entity = new BlackListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.blacklistee = event.params.blacklistee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFinalYieldDistribution(
  event: FinalYieldDistributionEvent
): void {
  let entity = new FinalYieldDistribution(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.participants = changetype<Bytes[]>(event.params.participants)
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLoanTaken(event: LoanTakenEvent): void {
  let entity = new LoanTaken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentMade(event: PaymentMadeEvent): void {
  let entity = new PaymentMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = changetype<Bytes>(event.params.user)
  entity.amount = event.params.amount
  entity.poolId = event.params.poolId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePoolRegistered(event: PoolRegisteredEvent): void {
  let entity = new PoolRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.payAmount = event.params.payAmount
  entity.users = changetype<Bytes[]>(event.params.users)
  entity.dueDates = event.params.dueDates

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
