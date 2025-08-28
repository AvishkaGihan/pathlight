import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [GitHub],
  callbacks: {
    async session({ session, user }) {
      if (user?.id) {
        const regs = await db.volunteerRegistration.count({
          where: { userId: user.id },
        });
        session.user.points = regs * 100; // Type-safe via Prisma
      }
      return session;
    },
  },
});
