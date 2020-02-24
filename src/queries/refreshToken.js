import gql from 'graphql-tag';

export default gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken:$refreshToken) 
  }
`;