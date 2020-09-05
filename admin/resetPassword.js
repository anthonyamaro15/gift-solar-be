const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Admin = require("./adminModel");

console.log("here ", process.env.SECRET_URL);

const route = express.Router();

route.patch("/forgotpassword", (req, res) => {
  const { email } = req.body;

  Admin.findBy({ email })
    .then(([admin]) => {
      if (!admin) {
        res.status(404).json({ errorMessage: "Invalid email" });
      } else {
        const token = jwt.sign({ admin: admin.email }, process.env.RESET_PASS, {
          expiresIn: "10m",
        });

        const id = admin.id;

        Admin.update(id, { resetLink: token }).then((adm) => {
          async function main() {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: process.env.GMAIL_USER, // generated ethereal user
                pass: process.env.GMAIL_PASS, // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: `Gift Solar <${process.env.GMAIL_USER}>`, // sender address
              to: email, // list of receivers
              subject: "Reset Password", // Subject line
              html: `
                <h2>Please click on given link to resest your password</2>
                <a href=${process.env.SECRET_URL}/resetpassword/${token}>${process.env.SECRET_URL}/resetpassword/${token}</a>
                `, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          }
          main();
          res.status(200).json({ message: "Reset link has been sent." });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Something went wrong with the server",
        error: err.message,
      });
    });
});

route.patch("/resetpassword/:token", (req, res) => {
  const resetLink = req.params.token;
  let credentials = req.body;

  if (resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASS, (error, decodedToken) => {
      if (error) {
        res
          .status(401)
          .json({ errorMessage: "Incorrect token or it is expired." });
      }
    });
  }

  Admin.findBy({ resetLink })
    .then(([link]) => {
      if (!link) {
        res
          .status(400)
          .json({ errorMessage: "Admin with this token does not exist." });
      }

      const hash = bcrypt.hashSync(
        credentials.password,
        Number(process.env.ROUNDS)
      );
      credentials.password = hash;

      const id = link.id;

      const newCredentials = {
        password: credentials.password,
        resetLink: "",
      };

      Admin.update(id, newCredentials)
        .then(() => {
          async function main() {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: process.env.GMAIL_USER, // generated ethereal user
                pass: process.env.GMAIL_PASS, // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: `${process.env.NAME} <${process.env.GMAIL_USER}>`, // sender address
              to: link.email, // list of receivers
              subject: "Gift Solar", // Subject line
              text: "activities", // plain text body
              html: `
                <h2>thank you</2>
                <p>your password was successfully updated</p>
                `, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          }
          main();
          res
            .status(200)
            .json({ message: "Password has been updated successfully" });
        })
        .catch((err) => {
          res.status(500).json({
            errorMessage: "There was an error updating the password",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "There was an error finding admin",
        error: err.message,
      });
    });
});

module.exports = route;
