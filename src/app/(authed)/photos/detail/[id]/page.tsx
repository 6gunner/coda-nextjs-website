import Frame from "@/components/frame/Frame";
import { Photo, fetchPhotos } from "@/lib/photos";

export default async function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photos: Photo[] = await fetchPhotos();

  const photo: Photo = photos.find((p) => p.id === id)!;

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <Frame photo={photo} />
      </div>
    </div>
  );
}
