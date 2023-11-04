import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prismaClient";
import axios from "axios";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.phone || !credentials.password) {
          throw new Error("Please enter an phone and password");
        }

        const res = await axios.post(`${process.env.AUTH_HOST}/auth/login`, {
          phoneNumber: credentials.phone,
          password: credentials.password,
        });

        if (!res) {
          throw new Error("Please enter a valid phone and password");
        }

        const user = res.data;

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
          id: user.data.userID,
          name: user.data.name,
          address: user.data.address,
          phoneNumber: user.data.phoneNumber,
          role: user.data.role,
          accessToken: user.accessToken,
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
  pages: {
    signIn: "/login",
  },
};
