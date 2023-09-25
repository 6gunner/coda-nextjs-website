export type Photo = {
  id: string;
  name: string;
  href: string;
  username: string;
  imageSrc: string;
};
export async function fetchPhotos(): Promise<Photo[]> {
  const resp = await fetch("http://localhost:3000/data/photos.json");
  const data = await resp.json();
  return data;
}