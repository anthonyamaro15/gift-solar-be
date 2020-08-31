exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("admin")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("admin").insert([
        { id: 1, email: "example@gmail.com", password: "test" },
      ]);
    });
};
