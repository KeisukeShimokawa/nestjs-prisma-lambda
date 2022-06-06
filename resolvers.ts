import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {},

  Mutation: {
    // @ts-expect-error 型エラーは一旦無視
    signUpUser: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });

      if (user) {
        throw new AuthenticationError("User already exists with that email");
      }

      const hashed = await hash(userNew.password, 10);

      const newUser = await prisma.user.create({
        data: {
          ...userNew,
          password: hashed,
        },
      });

      return newUser;
    },
  },
};
