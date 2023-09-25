import { Person } from "../list/page";
export async function generateStaticParams() {
  const people = await fetch("http://localhost:3000/data/people.json").then(
    (res) => res.json()
  );

  return people.map((item: Person) => ({
    id: item.id + "",
  }));
}
async function fetchPerson(id: number) {
  const res = await fetch("http://localhost:3000/data/people.json");
  const people: Array<Person> = await res.json();
  return people.find((person: Person) => {
    return person.id == id;
  });
}

export default async function UserDetail({
  params,
}: {
  params: { id: number };
}) {
  const person = await fetchPerson(params.id);

  return (
    <>
      {person ? (
        <div>
          <h1 className="font-extralight">User Detail</h1>
          User ID: {person.id}
          User Name: {person.name}
        </div>
      ) : (
        <div>
          <h1 className="font-extralight">Not Found</h1>
        </div>
      )}
    </>
  );
}
