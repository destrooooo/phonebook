import React from "react";
import personService from "../services/persons";

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setNotification,
  setNotificationType,
}) => {
  const addPerson = (event) => {
    event.preventDefault();
    // console.log("butn clicked", event.target);
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const alreadyExist = persons.find((person) => person.name === newName);
    console.log("test", alreadyExist);

    if (alreadyExist) {
      if (
        confirm(`${newName} already exist in the list, replace old number ?`)
      ) {
        const updatedPerson = { ...alreadyExist, number: newNumber };

        personService
          .updateNum(updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
            setNotification(`Updated ${newName}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotification(
              `Information of ${alreadyExist.name} has already been removed from server`
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotification(null);
              setNotificationType("success");
            }, 5000);
          });
      }
    } else {
      setPersons(persons.concat(personObject));
      alert(`${newName} added to numbers list`);
      setNotification(`Added ${newName}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <>
      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
