import { PrismaClient } from "@prisma/client";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "default";

export const resolvers = {
  Query: {
    // @ts-expect-error 型エラーは一旦無視
    users: async (_, args, { userId }) => {
      console.log({ userId });

      if (!userId) throw new ForbiddenError("must be logged in");

      const users = await prisma.user.findMany({
        where: {
          id: {
            not: userId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return users;
    },
  },

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

    // @ts-expect-error 型エラーは一旦無視
    signInUser: async (_, { userSignIn }) => {
      console.log({ userSignIn });

      const user = await prisma.user.findUnique({
        where: { email: userSignIn.email },
      });

      if (!user) {
        throw new AuthenticationError("User doesn't exists with that email");
      }

      const doMatch = await compare(userSignIn.password, user.password);

      if (!doMatch) {
        throw new AuthenticationError("email or password is invalid");
      }

      const token = sign({ userId: user.id }, jwtSecret);

      return { token };
    },
  },
};
