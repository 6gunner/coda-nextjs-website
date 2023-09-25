interface Album {
  id: number;
  title: string;
  year: number;
}

async function fetchData() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  const resp = await fetch("http://localhost:3000/data/albums.json");
  const data: Array<Album> = await resp.json();
  return data;
}

export default async function Albums({ artistId }: { artistId: string }) {
  const albums = await fetchData();
  return (
    <ul>
      {albums.map((album: Album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
