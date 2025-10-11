// src/app/api/auth/[...nextauth]/route.tsx
import { Login, loginWithGoogle } from "@/lib/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
          const { email, password } = credentials as { email: string; password: string };

          // Panggil fungsi login yang sudah cek password
          const result: any = await Login({ email, password });

          // Jika gagal login (email tidak ada / password salah)
          if (!result.status) {
            throw new Error(result.message);
          }

          // Ambil data user-nya
          const user = result.data;

          // Kembalikan ke NextAuth
          return {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
          };
        }
      }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
    }),
  ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
        if (account?.provider === "credentials") {
            token.email = user.email; 
            token.fullname = user.fullname;
            token.role = user.role;
        }
        if (account?.provider === "google") {
          const data = {
            fullname: user.name,
            email: user.email,
            type: 'google',
          };
          await loginWithGoogle(data, (result: { status: boolean, email: string; fullname: string; role: string; }) => {
            if (result.status) {
            token.email = result.email;
            token.fullname = result.fullname;
            token.role = result.role;
          }
          });
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