import { gql } from "@apollo/client";

export const ADD_NEW_USER = gql`
  mutation addNewUser($username: String!, $password: String!, $email: String!) {
    addNewUser(username: $username, password: $password, email: $email) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;
