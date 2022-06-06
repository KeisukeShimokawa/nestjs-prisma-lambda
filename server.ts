import { ApolloServer } from "apollo-server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { verify } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "default";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log({ req });

    const { authorization } = req.headers;
    if (authorization) {
      // @ts-expect-error 型エラーは一旦無視
      const { userId } = verify(authorization, jwtSecret);
      return { userId };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
