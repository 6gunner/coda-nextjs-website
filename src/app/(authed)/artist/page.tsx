import { Suspense } from "react";

// 自定义导入
import Albums from "./Albums";
import Loading from "../loading";
interface Artist {
  id: string;
  name: string;
}
export default function ArtistPage() {
  const artist: Artist = {
    id: "the-beatles",
    name: "The Beatles",
  };
  return (
    <>
      <h1 className="font-semibold text-lg py-4">{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}
