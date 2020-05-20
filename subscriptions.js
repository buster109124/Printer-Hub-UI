import { gql } from 'apollo-boost'

const CREATE = gql`

    mutation($company: String!,
              $ownership: Ownership,
              $companyPhone: String!,
              $website: String,
              $name: String!,
              $email: String!,
              $mobile: String,
              $title: String,
              $plan: String!,
              $token: String!)
  {
    createSubscription(args:{ 
              company: $company,
              ownership: $ownership,
              companyPhone: $companyPhone,
              website: $website,
              name: $name,
              email: $email,
              mobile: $mobile,
              title: $title,
              plan: $plan,
              token: $token
    })
  }
`

const SIMPLE_CREATE = gql`

    mutation($args: SubcriptionInput!)
    {
      createSubscription(args: $args)
    }
`

export default { CREATE ,SIMPLE_CREATE}
