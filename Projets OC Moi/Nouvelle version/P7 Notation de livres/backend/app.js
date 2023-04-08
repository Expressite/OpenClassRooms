const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const path = require("path");
//const bodyParser = require("body-parser");

//cette ligne permet de récupérer le corps de la requête pour les mettre
//à disposition dans la variable req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//let requests from different ports
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
//use users router
app.use("/api/auth", userRoutes);
//use books router
app.use("/api/books", bookRoutes);

module.exports = app;
