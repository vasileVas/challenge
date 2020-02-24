import gql from 'graphql-tag';

export default gql`
query getProfile($token: String!){
  profile(token: $token) {
    id
    name
    email
  }
}
`