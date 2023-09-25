import Image from "next/image";
import React from "react";
export interface Person {
  id: number;
  name: string;
  email: string;
  image: string;
}

async function fetchPeople() {
  const res = await fetch("http://localhost:3000/data/people.json");
  const people = await res.json();
  return people;
}

export default async function UserList() {
  const people = await fetchPeople();

  return (
    <div className=" py-4 px-10">
      <ul className="divide-y divide-gray-200">
        {people.map((person: Person) => (
          <li key={person.email} className="py-4 flex">
            <Image
              className="h-10 w-10 rounded-full"
              src={person.image}
              alt=""
              width={40}
              height={40}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
