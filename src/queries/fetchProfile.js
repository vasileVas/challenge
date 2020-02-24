import gql from 'graphql-tag';

export default gql`
  query getProfile($id:String!, $token: String!){
    profile(id: $id, token: $token) {
      id
      name,
      email,
      token
    }
  }
`