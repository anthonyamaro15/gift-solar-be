const express = require("express");
const nodemailer = require("nodemailer");
const contactTemplate = require("../templates/contactTemplate");
const appoinmentTemplate = require("../templates/appoinmentTemplate");
const {
  validateContact,
  validateAppoinment,
} = require("../validation/emailValidation");
const route = express.Router();

async function main(body, func, header) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: `Gift Solar <${process.env.GMAIL_USER}>`,
    to: process.env.SEND_TO,
    subject: header,
    html: func(body),
  });
  console.log("message sent: %s", info.messageId);
}

route.post("/appoinment", validateAppoinment, (req, res) => {
  const body = req.body;
  try {
    main(body, appoinmentTemplate, "Comfirmar Cita");
    res.status(200).json({ message: "Email sent." });
  } catch (err) {
    res.status(500).json({ errorMessage: "Email was not sent." });
  }
});

route.post("/contact", validateContact, (req, res) => {
  const body = req.body;
  try {
    main(body, contactTemplate, "Contactar a Gift Solar");
    res.status(200).json({ message: "Email sent." });
  } catch (error) {
    res.status(500).json({ errorMessage: "Email was not sent." });
  }
});

module.exports = route;
