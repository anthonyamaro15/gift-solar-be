const db = require("../data/config-bd");

function add(application) {
  return db("applications").insert(application, "id");
}

function addImgs(imgs) {
  return db("images").insert(imgs, "id");
}

function addPfd(pdf) {
  return db("pdfs").insert(pdf, "id");
}
async function all() {
  const applications = await db("applications");
  // joined application table with images table to send back the applications with its images as an array
  return Promise.all(
    applications.map(async (appli) => ({
      ...appli,
      images: await db("images as i").where({ "i.application_id": appli.id }),
      //   .select("i.id", "i.imgs"),
      pdf_file: await db("pdfs as p").where({ "p.application_id": appli.id }),
      //   .select("p.id", "p.pdf_file"),
    }))
  );
}

function findById(id) {
  return db("applications").where({ id }).first();
}

function findBy(filter) {
  return db("applications").where(filter);
}

function removePdf(id) {
  return db("pdfs").where({ id }).del();
}
function findPfdById(id) {
  return db("pdfs").where({ id }).first();
}

function removeApplication(id) {
  return db("applications").where({ id }).del();
}

function update(id, changes) {
  return db("applications").where({ id }).update(changes).returning("*");
}

module.exports = {
  add,
  all,
  findById,
  findBy,
  update,
  removePdf,
  removeApplication,
  findPfdById,
  addImgs,
  addPfd,
};
