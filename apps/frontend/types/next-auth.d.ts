import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    accessToken: string;
  }

  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      id: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    error?: string;
  }
}
