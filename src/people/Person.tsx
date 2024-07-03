import React from "react";

interface PersonProps {
  name: string;
  hairColor: string;
  eyeColor: string;
}

export function Person({ name, hairColor, eyeColor }: PersonProps) {
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairColor}</li>
        <li>eyes: {eyeColor}</li>
      </ul>
    </li>
  );
}
