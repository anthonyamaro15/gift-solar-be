const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const restricted = require("../middlewares/restricted");

const adminRoute = require("../admin/adminRoutes");
const applicationRoutes = require("../routes/applicationsRoutes");

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", adminRoute);
server.use("/api/application", applicationRoutes);

module.exports = server;
