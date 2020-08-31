const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./adminModel");

const route = express.Router();

route.post("/register", (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Admin.add(user)
    .then(() => {
      res.status(201).json({ message: "successfully created!" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "something went wrong", error: err.message });
    });
});

route.post("/login", (req, res) => {
  const { email, password } = req.body;

  Admin.findBy({ email }).then(([admin]) => {
    if (admin && bcrypt.compareSync(password, admin.password)) {
      const token = generateToken(admin);
      res.status(200).json({ token });
    }
  });
});

function generateToken(admin) {
  const payload = {
    admin: admin.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.SECRET, options);
}
module.exports = route;
