const express = require("express");
const Application = require("../models/applicationModel");
const {
  validateId,
  validatePdfId,
  validateBody,
} = require("../validation/applicationValidation");

const route = express.Router();

// POST /api/application/add
route.post("/add", validateBody, (req, res) => {
  const application = req.body;
  const images = req.body.images;
  const pdfs = req.body.pdf_file;

  // removed this two arrays because there are multiple images but sent everything in one POST request from the front-end
  delete application.images;
  delete application.pdf_file;

  Application.add(application)
    .then(([id]) => {
      // loop through images array to add them to its own table. addeded here becase we need application id
      images.forEach((imgs) => {
        let imgObj = { application_id: id, imgs };
        Application.addImgs(imgObj)
          .then(() => console.log("imgs added!"))
          .catch((err) => console.log(err.message));
      });
      // there is only going to be one pdf file we added here becase we need the application id
      Application.addPfd({ application_id: id, pdf_file: pdfs[0] })
        .then(() => console.log("pdf added"))
        .catch((err) => console.log(err.message));
      res.status(201).json({ message: "application added", id });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wron", error: err.message });
    });
});

// GET /api/application/all
route.get("/all", (req, res) => {
  Application.all()
    .then((applications) => res.status(200).json(applications))
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Something went wrong", error: err.message })
    );
});

// PATCH api/application/update/:id
route.patch("/update/:id", validateId, (req, res) => {
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
route.delete("/delete/:id", validateId, (req, res) => {
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
route.delete("/delete-pdf/:id", validatePdfId, (req, res) => {
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
