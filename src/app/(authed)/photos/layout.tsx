export default function PhotosLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {props.children}
      {props.modal}
    </div>
  );
}
