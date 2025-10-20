// import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import type { User as NextAuthUser } from "next-auth";

interface CustomUser extends NextAuthUser {
  role?: string;
  providerAccountId?: string;
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);

        if (user) {
          return user as CustomUser;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email: user_email, name, image } = user as CustomUser;
        const userCollection = dbConnect(collectionNameObj.userCollection);
        const isExistUser = await userCollection.findOne({ providerAccountId });

        if (!isExistUser) {
          const payload = { providerAccountId, provider, email: user_email, name, image, role: "user" };
          await userCollection.insertOne(payload);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = (user as CustomUser).name;
        token.role = (user as CustomUser).role;
      }
      return token;
    },
  },
};
