import Frame from "@/components/frame/Frame";

import Modal from "@/components/modal/Modal";
import { Photo, fetchPhotos } from "@/lib/photos";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photos: Photo[] = await fetchPhotos();
  const photo: Photo = photos.find((p) => p.id === photoId)!;

  return (
    <Modal>
      <Frame photo={photo}></Frame>
    </Modal>
  );
}
