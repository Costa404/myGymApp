import { gql } from "apollo-server-express";

const typeDefsCurrentUser = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type Query {
    CURRENT_USER: User
  }
`;

export default typeDefsCurrentUser;
