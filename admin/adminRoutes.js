const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.json("hello there");
});
module.exports = route;
