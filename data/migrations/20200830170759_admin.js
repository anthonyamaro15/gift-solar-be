exports.up = function (knex) {
  return knex.schema.createTable("admin", (table) => {
    table.increments();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("resetLink", 255);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("admin");
};
