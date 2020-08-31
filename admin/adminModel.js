const db = require("../data/config-bd");

function add(admin) {
  return db("admin").insert(admin, "id");
}

function getById(id) {
  return db("admin").where({ id }).first();
}

function findBy(filter) {
  return db("admin").where(filter);
}
function update(id, changes) {
  return db("admin").where({ id }).update(changes, "id");
}

module.exports = {
  add,
  update,
  getById,
  findBy,
};
