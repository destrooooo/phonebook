require(`dotenv`).config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Number = require("./models/phonebook");

app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Number.find({}).then((numbers) => {
    response.json(numbers);
  });
});

app.get("/info", (request, response) => {
  Number.countDocuments({}).then((count) => {
    const info = `<p>Phonebook has info for ${count} people</p>`;
    const date = new Date();
    response.send(`${info} ${date}`);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Number.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.error(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Number.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.error(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "new entry should have a name & a number!" });
  }

  Number.findOne({ name: body.name }).then((existing) => {
    if (existing) {
      return response.status(400).json({ error: "name must be unique" });
    }

    const person = new Number({
      name: body.name,
      number: body.number,
    });

    person.save().then((savedPerson) => {
      response.json(savedPerson);
    });
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
