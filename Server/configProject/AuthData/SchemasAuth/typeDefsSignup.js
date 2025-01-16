import { gql } from "apollo-server-express";

const typeDefsSignup = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    addNewUser(
      username: String!
      password: String!
      email: String!
    ): AuthPayload
  }
`;

export default typeDefsSignup;
