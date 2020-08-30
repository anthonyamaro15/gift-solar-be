const express = require("express");
const cors = require("cors");
const server = express();

const adminRoute = require("../admin/adminRoutes");

server.use(express.json());
server.use(cors());

server.use("/api/auth", adminRoute);

module.exports = server;
