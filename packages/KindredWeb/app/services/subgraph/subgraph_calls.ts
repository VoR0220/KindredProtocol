import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const queryUrl = "https://api.thegraph.com/subgraphs/name/vor0220/kindredprotocol"

const client = new ApolloClient({  uri: queryUrl,  cache: new InMemoryCache()})

export const QUERY_CIRCLES_REGISTERED = gql`
  query poolRegistereds(first: 5, where: {users_contains: $address}) {
    blockTimestamp
    dueDates
    payAmount
    poolId
    users
  }
`

