import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

// 自定义的导入
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextAuthProvider } from "@/app/providers";
const siteTitle = "Coda Admin Website";

export default async function AuthedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <NextAuthProvider session={session}>{children}</NextAuthProvider>
    </>
  );
}
