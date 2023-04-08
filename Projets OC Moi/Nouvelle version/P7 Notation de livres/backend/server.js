const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const db = require("./database");
const config = require("config");
const app = require("./app");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

//read db port from configuration file
const port = config.get("server.port");
app.set("port", port);

function errorHandler(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = http.createServer(app);
server.listen(port);
