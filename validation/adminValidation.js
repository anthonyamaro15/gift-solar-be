const Admin = require("../admin/adminModel");

function validateBody(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(500).json({ errorMessage: "Please provided require fields" });
  } else {
    next();
  }
}
function validateId(req, res, next) {
  const { id } = req.params;

  Admin.getById(id)
    .then((admin) => {
      if (!admin) {
        res.status(404).json({ errorMessage: "Invalid Admin ID" });
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
};
