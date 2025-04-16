import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PersonList from "./components/Personlist";
import PersonFilter from "./components/PersonFilter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] =
    useState("blah blah blah");
  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    console.log("effect");
    axios.get("/api/persons").then((response) => {
      console.log("promise fullfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType} />
      <PersonFilter search={search} setSearch={setSearch} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNotification={setNotificationMessage}
        setNotificationType={setNotificationType}
      />
      <PersonList
        persons={persons}
        search={search}
        setPersons={setPersons}
        setNotification={setNotificationMessage}
      />
    </div>
  );
};

export default App;
