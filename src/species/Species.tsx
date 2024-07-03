import React from "react";

interface SpeciesProps {
  name: string;
  language: string;
  averageLifespan: string;
}

export function Species({ name, language, averageLifespan }: SpeciesProps) {
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {averageLifespan}</li>
      </ul>
    </li>
  );
}
