import NextAuth, { SessionStrategy } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// 自定义导入
import { getUser } from "@/lib/auth"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // fixme: 改成lib里的getUser()：
        const user = { id: "1", name: "coda@fandom.co", password: "Abc@123123" };
        if (credentials?.username == user.name && credentials.password == user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // ...add more providers here
  pages: {
    signIn: "/login"
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }