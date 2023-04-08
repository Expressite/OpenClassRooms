//database connction handling
const mongoose = require("mongoose");
const config = require("config");

const url = config.get("db.url");
const coll = config.get("db.collection");
const user = config.get("db.user");
const pwd = config.get("db.password");

mongoose
  .connect(
    `mongodb+srv://${user}:${pwd}@${url}/${coll}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connection successfull !"))
  .catch((error) => console.log("MongoDB connection failed !" + error));

const db = mongoose.connection;

module.exports = db;
