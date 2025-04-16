import React from "react";
import personService from "../services/persons";

const PersonList = ({ persons, search, setPersons, setNotification }) => {
  // console.log(`persons`, persons);
  // console.log(search);

  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredList.map((person) => (
          <li key={person.id}>
            {person.name} : {person.number}
            <button
              onClick={() => {
                // @ts-ignore
                personService.deletePersonNum(person).then(() => {
                  setPersons(persons.filter((p) => p.id !== person.id));
                  setNotification(`${person.name} deleted`);
                  setTimeout(() => {
                    setNotification(null);
                  }, 5000);
                });
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonList;
