// src/app/api/auth/[...nextauth]/route.tsx
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
    strategy: "jwt",
  },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        type: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "hy@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          // Lakukan otentikasi di sini
          const { email, password } = credentials as { email: string; password: string };
          // Contoh sederhana, ganti dengan logika otentikasi yang sebenarnya
          const user: any = {id: "1", name: "Hy", email: "hy@example.com", role: "admin" };
          if (email === "hy@example.com" && password === "12345678") {
            return user
          } else {
            return null;
          }
        }
      })
  ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
        if (account?.provider === "credentials") {
            token.email = user.email; 
            token.fullname = user.fullname;
            token.role = user.role;
        }
        return token;
        },

        async session({ session, token }: any) {
        if ("email" in token) {
            session.user.email = token.email;
        }
        if ("fullname" in token) {
            session.user.fullname = token.fullname;
        }
        if ("role" in token) {
            session.user.role = token.role;
        }
        return session;
    }
    },
    pages: {
        signIn: '/login',
        signOut: '/login', // setelah logout diarahkan ke login
        error: '/login',   // jika error (misalnya unauthorized)
    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };