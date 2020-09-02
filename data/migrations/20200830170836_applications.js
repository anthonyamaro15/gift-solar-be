exports.up = function (knex) {
  return (
    knex.schema
      .createTable("applications", (table) => {
        table.increments();
        table.boolean("package_premium");
        table.boolean("package_plus");
        table.boolean("package_basico");
        table.string("first_person_name", 255).notNullable();
        table.string("first_person_number").notNullable();
        table.string("first_person_email", 255).notNullable().unique();
        table.boolean("first_person_do_taxes");
        table.boolean("first_person_dont_do_taxes");
        // second person
        table.string("second_person_name", 255);
        table.string("second_person_number");
        table.string("second_person_email", 255);
        table.boolean("second_person_do_taxes");
        table.boolean("second_person_dont_do_taxes");
        // adress
        table.string("address", 255).notNullable();
        table.string("state", 255).notNullable();
        table.string("city", 255).notNullable();
        table.string("zipcode").notNullable();
        // property information
        table.string("house_year_built").notNullable();
        table.string("house_sqrtfoot").notNullable();
        table.string("house_total_floors").notNullable();
        table.boolean("family_residence");
        table.boolean("town_house");
        table.boolean("condominio");
        table.boolean("mobile_home");
        // ceiling type
        table.boolean("shingle_ceiling_type");
        table.boolean("teja_ceiling_type");
        table.boolean("barro_ceiling_type");
        table.boolean("madera_ceiling_type");
        table.boolean("plano_ceiling_type");
        // ceiling condition
        table.boolean("ceiling_condition_excelent");
        table.boolean("ceiling_condition_good");
        table.boolean("ceiling_condition_pasable");
        table.boolean("ceiling_condition_old");
        // sombreado de techo
        table.boolean("sombreado_nada");
        table.boolean("sombreado_poco");
        table.boolean("sombreado_mucho");
        // wiht pool
        table.boolean("house_with_pool");
        table.boolean("house_with_no_pool");
        // gate number
        table.string("gate_number");
        table.boolean("hoa_exist");
        table.boolean("hoa_no_exist");
        table.string("hoa_information", 255);
        table.string("hoa_phone");
        // electric equitment information
        table.boolean("is_power_panel_close");
        table.boolean("is_power_panel_open");
        table.string("desc_for_panel_close");
        table.string("power_panel_size");
        // ac information
        table.string("ac_count");
        table.string("heater_count");
        table.boolean("heater_gas");
        table.boolean("heater_electric");
        table.boolean("heater_solar");
        table.boolean("have_solar_panel");
        table.boolean("dont_have_solar_panel");
        // power acc info
        table.string("power_bill_acc_number").notNullable();
        // yearly information
        table.string("enero_cost").notNullable();
        table.string("enero_kilowatts").notNullable();

        table.string("febrero_cost").notNullable();
        table.string("febrero_kilowatts").notNullable();

        table.string("marzo_cost").notNullable();
        table.string("marzo_kilowatts").notNullable();

        table.string("abril_cost").notNullable();
        table.string("abril_kilowatts").notNullable();

        table.string("mayo_cost").notNullable();
        table.string("mayo_kilowatts").notNullable();

        table.string("junio_cost").notNullable();
        table.string("junio_kilowatts").notNullable();

        table.string("julio_cost").notNullable();
        table.string("julio_kilowatts").notNullable();

        table.string("agosto_cost").notNullable();
        table.string("agosto_kilowatts").notNullable();

        table.string("septiembre_cost").notNullable();
        table.string("septiembre_kilowatts").notNullable();

        table.string("octubre_cost").notNullable();
        table.string("octubre_kilowatts").notNullable();

        table.string("noviembre_cost").notNullable();
        table.string("noviembre_kilowatts").notNullable();

        table.string("diciembre_cost").notNullable();
        table.string("diciembre_kilowatts").notNullable();
      })
      // Images table
      .createTable("images", (table) => {
        table.increments();
        table.string("imgs", 255);
        table
          .integer("application_id")
          .notNullable()
          .unsigned()
          .references("applications.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
      .createTable("pdfs", (table) => {
        table.increments();
        table.string("pdf_file", 255);
        table
          .integer("application_id")
          .notNullable()
          .unsigned()
          .references("applications.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("pdfs")
    .dropTableIfExists("images")
    .dropTableIfExists("applications");
};
