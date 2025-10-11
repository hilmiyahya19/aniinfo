// src/app/api/auth/[...nextauth]/route.ts
import { Login, loginWithGoogle } from "@/lib/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import { adminAuth } from "@/lib/firebase/server";

/* --------------------------------------------------------
   🔹 1. Custom Type Definitions
-------------------------------------------------------- */

// User hasil dari Firebase
interface FirebaseUser {
  id: string;
  email: string;
  fullname: string;
  role: string;
}

// Hasil fungsi Login() manual
interface LoginResult {
  status: boolean;
  statusCode: number;
  message: string;
  data?: FirebaseUser;
}

interface GoogleUser extends AuthUser {
  idToken?: string;
  name: string;
  email: string;
}

interface AuthUser {
  id: string;
  email: string;
  fullname: string;
  role: string;
}

/* --------------------------------------------------------
   🔹 2. Auth Configuration
-------------------------------------------------------- */
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  providers: [
    /* ---- Credentials (email + password) ---- */
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "hy@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi.");
        }

        const result: LoginResult = await Login({
          email: credentials.email,
          password: credentials.password,
        });

        if (!result.status || !result.data) {
          throw new Error(result.message || "Login gagal.");
        }

        const user = result.data;

        return {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.role,
        };
      },
    }),

    /* ---- Google OAuth ---- */
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "",
    }),
  ],

  /* --------------------------------------------------------
     🔹 3. Callbacks
  -------------------------------------------------------- */
  callbacks: {
    // ✅ JWT callback (menyimpan data user ke token)
    async jwt({ token, account, user }) {
      // Login manual via email + password
      if (account?.provider === "credentials" && user) {
        const u = user as AuthUser;
        token.email = u.email;
        token.fullname = u.fullname;
        token.role = u.role;
      }

      // Login via Google
      if (account?.provider === "google" && user?.email && user?.name) {
        const googleUser = user as GoogleUser;

        // const idToken = googleUser.idToken; // token dari Google OAuth
        // if (idToken) {
        //   try {
        //     // Verifikasi token Google via Firebase Admin
        //     const decoded = await adminAuth.verifyIdToken(idToken);
        //     // decoded.uid, decoded.email, dll tersedia
        //     token.email = decoded.email;
        //     token.fullname = googleUser.name;
        //     token.role = "member"; // atau ambil dari Firestore
        //   } catch (err) {
        //     console.error("Firebase Admin token verification failed:", err);
        //   }
        // }

        await new Promise<void>((resolve) => {
          loginWithGoogle(
            { email: googleUser.email, fullname: googleUser.name, type: "google" },
            (result) => {
              if (result.status && result.data) {
                const u = result.data;
                token.email = u.email;
                token.fullname = u.fullname;
                token.role = u.role; // ambil role dari Firestore
              }
              resolve();
            }
          );
        });
      }

      return token;
    },

    // ✅ Session callback (mengembalikan data ke frontend)
    async session({ session, token }) {
      if (token.email) session.user.email = token.email as string;
      if (token.fullname)
        (session.user as { fullname?: string }).fullname = token.fullname as string;
      if (token.role)
        (session.user as { role?: string }).role = token.role as string;

      return session;
    },
  },

  /* --------------------------------------------------------
     🔹 4. Redirect Pages
  -------------------------------------------------------- */
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
};

/* --------------------------------------------------------
   🔹 5. Export Handler
-------------------------------------------------------- */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
