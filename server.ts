import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "crypto";

const users = [
  {
    id: randomUUID(),
    firstName: "Sample",
    lastName: "beautify",
    email: "sample@example.com",
    password: "12345",
  },
  {
    id: randomUUID(),
    firstName: "Example",
    lastName: "dirty",
    email: "dirty@example.com",
    password: "98765",
  },
];

const todos = [
  {
    title: "sample todo1",
    by: users[0].id,
  },
  {
    title: "sample todo 2",
    by: users[1].id,
  },
];

const typeDefs = gql`
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

  type Mutation {
    createUser(userNew: UserInput!): User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    todos: [Todo]
  }

  type Todo {
    title: String
    by: ID!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    // @ts-expect-error 型エラーは一旦無視
    user: (parent, { id }, context) => {
      console.log({ parent });
      console.log({ context });
      console.log({ id });
      return users.find((item) => item.id === id);
    },
  },

  User: {
    todos: (parent: any) => {
      console.log({ parent });
      return todos.filter((todo) => todo.by === parent.id);
    },
  },

  Mutation: {
    createUser: (_: any, { userNew }: any) => {
      console.log({ _ });
      console.log({ userNew });

      const newUser = {
        id: randomUUID(),
        ...userNew,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
