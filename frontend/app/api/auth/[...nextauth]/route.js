import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail, findUserByUsername, verifyPassword, updateLastLogin } from "@/lib/auth";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login", // separate login page to avoid redirect loop
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // Support both email and username (existing DB uses username)
        const user = await findUserByEmail(credentials.email);
        if (!user) return null;
        // Existing DB uses 'password' field, not 'passwordHash'
        const passwordHash = user.password || user.passwordHash;
        if (!passwordHash) return null;
        const isValid = await verifyPassword(credentials.password, passwordHash);
        if (!isValid) return null;
        const username = user.username || credentials.email;
        await updateLastLogin(username);
        return {
          id: user._id?.toString() || username,
          email: user.email || credentials.email,
          username: username,
          role: user.role || "admin",
          name: user.name || username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "editor";
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
