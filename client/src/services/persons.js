import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePersonNum = (person) => {
  if (confirm(`Delete ${person.name} from phonebook ?`)) {
    const request = axios.delete(`${baseUrl}/${person.id}`);
    return request.then((response) => response.data);
  }
};

const updateNum = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePersonNum, updateNum };
