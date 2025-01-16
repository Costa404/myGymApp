import { gql } from "apollo-server-express";

const typeDefsLogin = gql`
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
    # Mutation para autenticar um usuário
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default typeDefsLogin;
