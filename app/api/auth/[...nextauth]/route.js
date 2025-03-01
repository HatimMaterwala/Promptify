import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        // Ensure you are connected to the database
        await connectToDB();
        const userSession = await User.findOne({ email: session.user.email });
        if (userSession) {
          session.user.id = userSession._id.toString();
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // Check if the user exists
        const userExists = await User.findOne({ email: profile.email });
        // If the user does not exist, create one
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        // Always return true when sign in is successful
        return true;
      } catch (error) {
        console.error("Sign in callback error:", error);
        // Return false on error to avoid access denied issues
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
