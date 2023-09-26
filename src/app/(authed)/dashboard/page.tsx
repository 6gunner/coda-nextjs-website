// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import { headers } from "next/headers";

const fetchData = async (host: string) => {
  try {
    const res = await fetch(`http://${host}/api/dashboard`, { method: "POST" });
    return res.text();
  } catch (Error) {
    console.log(Error);
  }
};
export default async function Dashboard() {
  const host = headers().get("host");
  const data = await fetchData(host!);
  return <h1>{data}</h1>;
}
