import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BlackListed } from "../generated/schema"
import { BlackListed as BlackListedEvent } from "../generated/KindredCore/KindredCore"
import { handleBlackListed } from "../src/kindred-core"
import { createBlackListedEvent } from "./kindred-core-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let blacklistee = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newBlackListedEvent = createBlackListedEvent(blacklistee)
    handleBlackListed(newBlackListedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BlackListed created and stored", () => {
    assert.entityCount("BlackListed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BlackListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "blacklistee",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
