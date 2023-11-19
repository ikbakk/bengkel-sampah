import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prismaClient";
import axios from "axios";

async function refreshAccessToken(token) {
  console.log("Refreshing access token", token);
  try {
    const url = `${process.env.AUTH_HOST}/auth/refreshtoken`;

    const response = await axios.post(url, {
      refreshToken: token.refreshToken,
    });

    const accessToken = await response.data;

    if (!response.ok) {
      throw accessToken;
    }

    console.log("Refreshed access token");
    console.log(accessToken);

    return {
      ...token,
      accessToken: accessToken.data.accessToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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

        delete user.message;

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
      const { token, user, account } = payload;
      console.log(user, account);
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user: {
            userID: user.data.userID,
            phoneNumber: user.data.phoneNumber,
            name: user.data.name,
            address: user.data.address,
            role: user.data.role,
            email: user.data.email,
          },
        };
      }

      if (Date.now() < token.exp * 1000) {
        return token;
      }

      console.log("Access token has expired, trying to refresh it");

      return refreshAccessToken(token);
    },
    session: async (payload) => {
      let { session, token } = payload;

      session = { ...token };

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
