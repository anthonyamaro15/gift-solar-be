const express = require("express");
const nodemailer = require("nodemailer");
const Application = require("../models/applicationModel");
const newApplicationTemplate = require("../templates/newApplicationTemplate");
const restricted = require("../middlewares/restricted");
const {
  validateId,
  validatePdfId,
  validateBody,
} = require("../validation/applicationValidation");

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

const route = express.Router();

// POST /api/application/add
route.post("/add", validateBody, (req, res) => {
  const application = req.body;
  const images = req.body.images;
  const pdfs = req.body.pdf_file;
  const pdf_name = req.body.pdf_name;

  // removed this two arrays because there are multiple images but sent everything in one POST request from the front-end
  delete application.images;
  delete application.pdf_file;
  delete application.pdf_name;

  Application.add(application)
    .then(([id]) => {
      // loop through images array to add them to its own table. addeded here becase we need application id
      images.forEach((imgs) => {
        let imgObj = { application_id: id, ...imgs };
        Application.addImgs(imgObj)
          .then(() => console.log("imgs added!"))
          .catch((err) => console.log(err.message));
      });
      // // there is only going to be one pdf file we added here becase we need the application id
      Application.addPfd({ application_id: id, pdf_file: pdfs, pdf_name })
        .then(() => console.log("pdf added"))
        .catch((err) => console.log(err.message));
      res.status(201).json({ message: "recibimos su applicion.", id });
      // send notification email of new application
      main(application, newApplicationTemplate, "Nueva applicacion");
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

// GET /api/application/all
route.get("/all", restricted, (req, res) => {
  Application.all()
    .then((applications) => res.status(200).json(applications))
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Something went wrong", error: err.message })
    );
});

// PATCH api/application/update/:id
route.patch("/update/:id", restricted, validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Application.update(id, changes)
    .then((id) =>
      res.status(200).json({ message: "Application updated successfully", id })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Somethig went wrong", error: err.message })
    );
});

// DELETE api/application/delete/:id
route.delete("/delete/:id", restricted, validateId, (req, res) => {
  const { id } = req.params;

  Application.removeApplication(id)
    .then(() =>
      res.status(200).json({ message: "Application Deleted Successfully." })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Something went wrong", error: err.message })
    );
});

// DELETE api/application/delete-pdf/:id
route.delete("/delete-pdf/:id", restricted, validatePdfId, (req, res) => {
  const { id } = req.params;

  Application.removePdf(id)
    .then(() => res.status(200).json({ message: "pdf deleted successfully!" }))
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Something went wrong", error: err.message })
    );
});

module.exports = route;
