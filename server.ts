import { ApolloServer, gql } from "apollo-server";

const users = [
  {
    id: 1,
    firstName: "Sample",
    lastName: "beautify",
    email: "sample@example.com",
    password: "12345",
  },
  {
    id: 2,
    firstName: "Example",
    lastName: "dirty",
    email: "dirty@example.com",
    password: "98765",
  },
];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID): User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    // @ts-expect-error 型エラーは一旦無視
    user: (parent, args, context) => {
      console.log(args);
      return users.find((item) => item.id === args.id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
