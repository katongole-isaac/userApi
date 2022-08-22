const express = require("express");
const user = require("../routes/users");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/user", user);
  app.use(helmet());
  app.use(compression());
};
