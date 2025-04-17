const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Usage: node mongo.js <password> [<name> <number>]");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://clementsilva:${password}@phonebook.hnj8e5t.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhoneNumber = mongoose.model("PhoneNumber", numberSchema);

if (process.argv.length === 3) {
  //display all numbers
  PhoneNumber.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // ajouter un nouveau numéro
  const phoneNumber = new PhoneNumber({ name, number });

  phoneNumber.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid number of arguments");
  mongoose.connection.close();
}
