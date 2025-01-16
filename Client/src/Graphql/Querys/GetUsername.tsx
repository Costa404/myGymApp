import { gql } from "@apollo/client";

const GET_USERNAME = gql`
  query {
    CURRENT_USER {
      id
      username
      email
    }
  }
`;

export default GET_USERNAME;
