const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./adminModel");
const { validateBody, validateId } = require("../validation/adminValidation");

const route = express.Router();

route.post("/register", validateBody, (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, Number(process.env.ROUNDS));
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

route.post("/login", validateBody, (req, res) => {
  const { email, password } = req.body;

  Admin.findBy({ email })
    .then(([admin]) => {
      if (admin && bcrypt.compareSync(password, admin.password)) {
        const token = generateToken(admin);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ errorMessage: "Invalid email or password" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong", error: err.message });
    });
});

route.patch("/edit/:id", validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (changes.email) {
    res
      .status(400)
      .json({ errorMessage: "You are not allow to change your email." });
  } else if (changes.password) {
    const hash = bcrypt.hashSync(changes.password, 8);
    changes.password = hash;

    Admin.update(id, changes)
      .then((admin) => {
        console.log("here ", admin);
        res
          .status(200)
          .json({ message: "Password has been updated successfully" });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ errorMessage: "Something went wrong", error: err.message });
      });
  }
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
