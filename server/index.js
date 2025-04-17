require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/phonebook");

app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  Person.countDocuments({}).then((count) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "new entry should have a name & a number!" });
  }

  Person.findOne({ name }).then((existing) => {
    if (existing) {
      return res.status(400).json({ error: "name must be unique" });
    }

    const newPerson = new Person({ name, number });

    newPerson.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
