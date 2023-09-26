import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Head from "next/head";

// 自定义的import
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginPageContent from "./login";

async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <Head>
        <title>Login Management</title>
      </Head>
      <LoginPageContent />
    </>
  );
}

export default LoginPage;
