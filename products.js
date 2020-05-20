import { gql } from 'apollo-boost'

const ALL = gql`
{
  products(levels:[Associate, LimitedPartner, AdvisoryPartner]){
    id
    name
    plans{
      id
      nickname
      currency
      interval
      amount
    }
  }
}`

export default { ALL }
