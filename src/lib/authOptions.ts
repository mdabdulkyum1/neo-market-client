import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://neo-market-server.vercel.app/api/v1";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
     async authorize(credentials) {
       try {
         const { data } = await axios.post(`${BASE_URL}/auth/login`, {
           email: credentials?.email,
           password: credentials?.password,
         });
     
         const userData = data?.data;
     
         if (userData?.accessToken) {
           return {
             id: userData.id,
             name: userData.name,
             email: userData.email,
             role: userData.role,
             accessToken: userData.accessToken,
           };
         }

      return null;
  } catch (error) {
    console.error("❌ Login failed:", error);
    return null;
  }
}

    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account && account.provider !== "credentials") {
          const { email, name } = user;
          await axios.post(`${BASE_URL}/auth/create-account-with-google`, { email, name });
        }
        return true;
      } catch (error) {
        console.error("Social login failed:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
