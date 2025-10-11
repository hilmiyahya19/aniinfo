// // src/app/api/auth/[...nextauth]/route.tsx
// import { Login, loginWithGoogle } from "@/lib/firebase/service";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// /* --------------------------------------------------------
//    🔹 1. Custom Type Definitions
// -------------------------------------------------------- */

// // User hasil dari Firebase
// interface FirebaseUser {
//   id: string;
//   email: string;
//   fullname: string;
//   role: string;
// }

// // Hasil fungsi Login() manual
// interface LoginResult {
//   status: boolean;
//   message?: string;
//   data?: FirebaseUser;
// }

// // Hasil callback login Google
// interface GoogleLoginResult {
//   status: boolean;
//   email: string;
//   fullname: string;
//   role: string;
// }

// // Bentuk data yang dikirim untuk login Google
// interface GoogleLoginData {
//   fullname: string;
//   email: string;
//   type: "google";
// }

// // Token JWT yang akan disimpan NextAuth
// interface ExtendedToken {
//   email?: string;
//   fullname?: string;
//   role?: string;
//   name?: string;
//   picture?: string;
//   sub?: string;
//   iat?: number;
//   exp?: number;
//   jti?: string;
// }

// // User yang dikembalikan oleh authorize()
// interface AuthUser extends User {
//   id: string;
//   email: string;
//   fullname: string;
//   role: string;
// }

// const authOptions: NextAuthOptions = {
//     session: {
//     strategy: "jwt",
//   },
//     secret: process.env.NEXTAUTH_SECRET,
//     providers: [
//       CredentialsProvider({
//         type: "credentials",
//         name: "Credentials",
//         credentials: {
//           email: { label: "Email", type: "text", placeholder: "hy@example.com" },
//           password: { label: "Password", type: "password" }
//         },
//         async authorize(credentials): Promise<AuthUser | null> {
//           if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email dan password wajib diisi.");
//         }

//         const { email, password } = credentials;

//           // Panggil fungsi login yang sudah cek password
//           const result: LoginResult = await Login({ email, password });

//           // Jika gagal login (email tidak ada / password salah)
//            if (!result.status || !result.data) {
//           throw new Error(result.message || "Login gagal.");
//         }

//           // Ambil data user-nya
//           const user = result.data;

//           // Kembalikan ke NextAuth
//           return {
//             id: user.id,
//             email: user.email,
//             fullname: user.fullname,
//             role: user.role,
//           };
//         }
//       }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
//     }),
//   ],
//     callbacks: {
//       async jwt({
//       token,
//       account,
//       user,
//     }: {
//       token: ExtendedToken;
//       account?: { provider?: string };
//       user?: Partial<AuthUser> & { name?: string };
//     }): Promise<ExtendedToken> {
//       // Login manual
//       if (account?.provider === "credentials" && user) {
//         token.email = user.email;
//         token.fullname = user.fullname;
//         token.role = user.role;
//       }
//         // Login via Google
//       if (account?.provider === "google" && user?.email && user?.name) {
//         const data: GoogleLoginData = {
//           fullname: user.name,
//           email: user.email,
//           type: "google",
//         };

//         await loginWithGoogle(
//           data,
//           (result: GoogleLoginResult): void => {
//             if (result.status) {
//               token.email = result.email;
//               token.fullname = result.fullname;
//               token.role = result.role;
//             }
//           }
//         );
//       }

//       return token;
//     },

//     async session({
//       session,
//       token,
//     }: {
//       session: Session;
//       token: ExtendedToken;
//     }): Promise<Session> {
//       if (token.email) session.user.email = token.email;
//       if (token.fullname) (session.user as any).fullname = token.fullname;
//       if (token.role) (session.user as any).role = token.role;

//       return session;
//     },

//     },
//     pages: {
//         signIn: '/login',
//         signOut: '/login', // setelah logout diarahkan ke login
//         error: '/login',   // jika error (misalnya unauthorized)
//     },

// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// src/app/api/auth/[...nextauth]/route.ts
import { Login, loginWithGoogle } from "@/lib/firebase/service";
// import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import type { JWT } from "next-auth/jwt";

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

// Hasil callback login Google
interface GoogleLoginResult {
  // status: boolean;
  // email: string;
  // fullname: string;
  // role: string;
  // fullname: string;
  // email: string;
  // type: "google";
  status: boolean;
  data?: {
    email: string;
    fullname: string;
    role: string;
  };
}

// Bentuk data yang dikirim untuk login Google
interface GoogleLoginData {
  fullname: string;
  email: string;
  type: "google";
  // status?: boolean;
  // data?: FirebaseUser;
  // message?: string;
}


// Token JWT yang akan disimpan NextAuth
// interface ExtendedToken {
//   email?: string;
//   fullname?: string;
//   role?: string;
//   name?: string;
//   picture?: string;
//   sub?: string;
//   iat?: number;
//   exp?: number;
//   jti?: string;
// }

// User yang dikembalikan oleh authorize()
// interface AuthUser extends User {
//   id: string;
//   email: string;
//   fullname: string;
//   role: string;
// }
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
    // async jwt({
    //   token,
    //   account,
    //   user,
    // }: {
    //   token: ExtendedToken;
    //   account?: { provider?: string };
    //   user?: Partial<AuthUser> & { name?: string };
    // }): Promise<ExtendedToken> {

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
        const data: GoogleLoginData = {
          fullname: user.name,
          email: user.email,
          type: "google",
        };

        // await loginWithGoogle(
        //   data,
        //   (result: GoogleLoginResult): void => {
        //     if (result.status) {
        //       token.email = result.email;
        //       token.fullname = result.fullname;
        //       token.role = result.role;
        //     }
        //   }
        // );

        const result: GoogleLoginResult = await new Promise<GoogleLoginResult>((resolve) => {
          loginWithGoogle(data, (res) => resolve(res));
        });

        if (result.status && result.data) {
          token.email = result.data.email;
          token.fullname = result.data.fullname;
          token.role = result.data.role;
        }
      }
      return token;
    },

    // async session({
    //   session,
    //   token,
    // }: {
    //   session: Session;
    //   token: ExtendedToken;
    // }): Promise<Session> {
    //   if (token.email) session.user.email = token.email;
    //   if (token.fullname) (session.user as any).fullname = token.fullname;
    //   if (token.role) (session.user as any).role = token.role;

    //   return session;
    // },
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
