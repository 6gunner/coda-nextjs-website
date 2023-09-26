import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const cookieStore = cookies();
  const headersList = headers()

  const token = cookieStore.get("token");
  const referer = headersList.get('referer') || "";

  return new Response("Hello, Next.JS!", {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token?.value}`,
      referer: referer,
    }
  })
}

export async function DELETE(request: Request) {
  redirect('https://nextjs.org/')
}