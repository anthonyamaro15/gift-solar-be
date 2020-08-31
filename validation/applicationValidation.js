const Application = require("../models/applicationModel");

function validateBody(req, res, next) {
  const {
    first_person_name,
    first_person_number,
    first_person_email,
    address,
    state,
    city,
    zipcode,
    house_year_built,
    house_sqrtfoot,
    house_total_floors,
    power_panel_size,
    ac_count,
    power_bill_acc_number,
    enero_cost,
    enero_kilowatts,
    febrero_cost,
    febrero_kilowatts,
    marzo_cost,
    marzo_kilowatts,
    abril_cost,
    abril_kilowatts,
    mayo_cost,
    mayo_kilowatts,
    junio_cost,
    junio_kilowatts,
    julio_cost,
    julio_kilowatts,
    agosto_cost,
    agosto_kilowatts,
    septiembre_cost,
    septiembre_kilowatts,
    octubre_cost,
    octubre_kilowatts,
    noviembre_cost,
    noviembre_kilowatts,
    diciembre_cost,
    diciembre_kilowatts,
  } = req.body;

  if (
    !first_person_name ||
    !first_person_number ||
    !first_person_email ||
    !address ||
    !state ||
    !city ||
    !zipcode ||
    !house_year_built ||
    !house_sqrtfoot ||
    !house_total_floors ||
    !power_panel_size ||
    !ac_count ||
    !power_bill_acc_number ||
    !enero_cost ||
    !enero_kilowatts ||
    !febrero_cost ||
    !febrero_kilowatts ||
    !marzo_cost ||
    !marzo_kilowatts ||
    !abril_cost ||
    !abril_kilowatts ||
    !mayo_cost ||
    !mayo_kilowatts ||
    !junio_cost ||
    !junio_kilowatts ||
    !julio_cost ||
    !julio_kilowatts ||
    !agosto_cost ||
    !agosto_kilowatts ||
    !septiembre_cost ||
    !septiembre_kilowatts ||
    !octubre_cost ||
    !octubre_kilowatts ||
    !noviembre_cost ||
    !noviembre_kilowatts ||
    !diciembre_cost ||
    !diciembre_kilowatts
  ) {
    res.status(400).json({ errorMessage: "Please fill out require fills" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;

  Application.findById(id)
    .then((application) => {
      if (!application) {
        res.status(404).json({ errorMessage: "Invalid application ID" });
      } else {
        next();
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Something went wrong", error: err.message })
    );
}

function validatePdfId(req, res, next) {
  const { id } = req.params;

  Application.findPfdById(id)
    .then((pdf) => {
      if (!pdf) {
        res.status(404).json({ errorMessage: "Invalid pdf ID" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong", error: err.message });
    });
}

module.exports = {
  validateBody,
  validateId,
  validatePdfId,
};
