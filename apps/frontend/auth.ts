import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const API_URL = process.env.API_URL;

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 24 * 60 * 5,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        try {
          const res = await fetch(`${API_URL}/auth/${account.provider}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: account.access_token }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error("Backend auth failed");

          console.log("====================================");
          console.log(data.access_token);
          console.log("====================================");
          token.accessToken = data.access_token;
          token.id = data.user_id;
        } catch (error) {
          console.error("Auth Error:", error);
          token.error = "AuthExchangeError";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken;
      }
      if (session) {
        session.user.id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? `${baseUrl}/app/dashboard` : url;
    },
  },
});
