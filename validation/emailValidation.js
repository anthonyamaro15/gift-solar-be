function validateContact(req, res, next) {
  const { name, phoneNumber, email, message } = req.body;

  if (!name || !phoneNumber || !email || !message) {
    res.status(400).json({ errorMessage: "Please provide require fields." });
  } else {
    next();
  }
}

function validateAppoinment(req, res, next) {
  const { name, number, appoinmentTime } = req.body;

  if (!name || !number || !appoinmentTime) {
    res.status(400).json({ errorMessage: "Please provide require fields." });
  } else {
    next();
  }
}

module.exports = {
  validateAppoinment,
  validateContact,
};
