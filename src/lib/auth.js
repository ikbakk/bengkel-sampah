import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prismaClient";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.phoneNumber || !credentials.password) {
          throw new Error("Please enter an phone and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            phoneNumber: credentials.phoneNumber,
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async (payload) => {
      const { token, user } = payload;
      if (user) {
        token.user = {
          id: user.userID,
          name: user.name,
          phone: user.phoneNumber,
          role: user.role,
        };
      }
      return token;
    },
    session: async (payload) => {
      const { session, token } = payload;
      session.user = token.user;
      return session;
    },
  },
};
