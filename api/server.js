const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const restricted = require("../middlewares/restricted");

const adminRoute = require("../admin/adminRoutes");
const applicationRoutes = require("../routes/applicationsRoutes");
const emailRoute = require("../routes/emailRoute");
const resetPassword = require("../admin/resetPassword");

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", adminRoute);
server.use("/api/auth", resetPassword);
server.use("/api/application", applicationRoutes);
server.use("/api", emailRoute);

module.exports = server;
