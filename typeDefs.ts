import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSignInInput {
    email: String!
    password: String!
  }

  type Mutation {
    signUpUser(userNew: UserInput!): User
    signInUser(userSignIn: UserSignInInput): Token
  }

  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
  }

  type Token {
    token: String!
  }
`;
