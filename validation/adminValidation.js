const Admin = require("../data/config-bd");

function validateBody(req, res, next) {
  const { email, password } = req.body;

  if (!email || password) {
    res.status(500).json({ errorMessage: "Please provided require fields" });
  } else {
    next();
  }
}
function validateId(req, res, next) {
  const { id } = req.params;

  Admin.getById(id).then((admin) => {
    if (!admin) {
      res.status(404).json({ errorMessage: "Invalid Admin ID" });
    } else {
      next();
    }
  });
}

module.exports = {
  validateBody,
  validateId,
};
