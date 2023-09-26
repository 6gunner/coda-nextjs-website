import NextAuth, { Session, SessionStrategy } from "next-auth"
import { getCsrfToken } from "next-auth/react"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { HttpsProxyAgent } from "https-proxy-agent";
import { SiweMessage } from "siwe"
// 自定义导入
import { getUser } from "@/lib/auth"

const agent = new HttpsProxyAgent(process.env.HTTP_PROXY || "");

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      httpOptions: {
        timeout: 40000,
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      httpOptions: {
        agent
      }
    }),
    CredentialsProvider({
      id: "password",
      name: "Password",
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
    CredentialsProvider({
      id: "ethereum",
      name: "Ethereum",
      credentials: {
        // 定义参数
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          console.log(`siwe = ${JSON.stringify(siwe)}`)
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!)

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: siwe.nonce
          })
          if (result.success) {
            return {
              id: siwe.address,
            }
          }
          return null
        } catch (e) {
          return null
        }
      },
    }),

  ],
  // ...add more providers here
  pages: {
    signIn: "/login"
  },
  callbacks: {
    // doc：https://next-auth.js.org/configuration/callbacks
    // 将一些属性放到session里
    async session({ session, token }: { session: any, token: any }) {
      session.address = token.sub
      session.user.name = token.sub
      return session
    },
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }