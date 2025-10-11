import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    fullname?: string | null;
    role?: string | null;
  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      fullname?: string | null;
      role?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    fullname?: string | null;
    role?: string | null;
  }
}
