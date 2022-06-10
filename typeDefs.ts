import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User]
    messagesByUser(receiverId: Int!): [Message]
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
    createMessage(receiverId: Int!, text: String!): Message
  }

  scalar Date

  type Message {
    id: ID!
    text: String!
    receiverId: Int!
    senderId: Int!
    createdAt: Date!
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
