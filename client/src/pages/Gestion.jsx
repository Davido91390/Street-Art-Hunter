import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { Validation, Hunters, Version } from "../components/AdminSettings";

import "../styles/gestion.css";

export default function Gestion() {
  const { readArtwork, readUsers } = useLoaderData();
  const artworks = readArtwork;
  const users = readUsers;

  const [isActive, setIsActive] = useState("Validation");

  const headers = [
    { name: "Validation" },
    { name: "Hunters" },
    { name: "Version" },
    { name: "" },
  ];

  const adminSettings = { Validation, Hunters, Version };

  const Admin = adminSettings[isActive];

  const handleClickActive = (header) => {
    if (header.name.length > 0) {
      setIsActive(header.name);
    }
  };

  return (
    <section className="gestion">
      <h1>Gestion</h1>
      <div className="gestionHeader">
        <div className="gestionContainer">
          {headers.map((header) => (
            <button
              key={header.name}
              type="button"
              className={
                header.name === isActive ? "headers active" : "headers"
              }
              onClick={() => handleClickActive(header)}
            >
              <p>{header.name}</p>
            </button>
          ))}
        </div>
      </div>
      <section className="gestionBody">
        <Admin artworks={artworks} users={users} />
      </section>
    </section>
  );
}
