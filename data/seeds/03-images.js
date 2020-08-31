exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("images")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("images").insert([
        { application_id: 1, imgs: "this is an url for an img" },
        { application_id: 1, imgs: "still imgae for application 1" },
        { application_id: 2, imgs: "img for application 2" },
        { application_id: 2, imgs: "smily face for application number 2" },
      ]);
    });
};
