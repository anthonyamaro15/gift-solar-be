exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("applications")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("applications").insert([
        {
          package_premium: true,
          package_plus: false,
          package_basico: false,

          first_person_name: "lisa",
          first_person_number: 34343434,
          first_person_email: "lisa@gmail.com",
          first_person_do_taxes: true,
          first_person_dont_do_taxes: false,

          second_person_name: "mario",
          second_person_number: 3555534,
          second_person_email: "mario@gmail.com",
          second_person_do_taxes: false,
          second_person_dont_do_taxes: true,

          address: "this is an example address",
          state: "california",
          city: "los angeles",
          zipcode: 98433,

          house_year_built: 2002,
          house_sqrtfoot: 2000,
          house_total_floors: 2,
          family_residence: false,
          town_house: false,
          condominio: true,
          mobile_home: false,

          shingle_ceiling_type: true,
          teja_ceiling_type: false,
          barro_ceiling_type: false,
          madera_ceiling_type: false,
          plano_ceiling_type: false,

          ceiling_condition_excelent: true,
          ceiling_condition_good: false,
          ceiling_condition_pasable: false,
          ceiling_condition_old: false,

          sombreado_nada: true,
          sombreado_poco: false,
          sombreado_mucho: false,

          house_with_pool: false,
          house_with_no_pool: true,

          gate_number: "",
          hoa_exist: false,
          hoa_no_exist: true,
          hoa_information: "not record found",
          hoa_phone: 0,

          is_power_panel_close: false,
          is_power_panel_open: true,
          desc_for_panel_close: "the panel is open",
          power_panel_size: 12,

          ac_count: 2,
          heater_count: 1,
          heater_gas: true,
          heater_electric: false,
          heater_solar: false,
          have_solar_panel: false,
          dont_have_solar_panel: false,

          power_bill_acc_number: 231323132132,

          enero_cost: 55.99,
          enero_kilowatts: 12,
          febrero_cost: 55.99,
          febrero_kilowatts: 12,
          marzo_cost: 55.99,
          marzo_kilowatts: 12,
          abril_cost: 55.99,
          abril_kilowatts: 12,
          mayo_cost: 55.99,
          mayo_kilowatts: 12,
          junio_cost: 55.99,
          junio_kilowatts: 12,
          julio_cost: 55.99,
          julio_kilowatts: 12,
          agosto_cost: 55.99,
          agosto_kilowatts: 12,
          septiembre_cost: 55.99,
          septiembre_kilowatts: 12,
          octubre_cost: 55.99,
          octubre_kilowatts: 12,
          noviembre_cost: 55.99,
          noviembre_kilowatts: 12,
          diciembre_cost: 55.99,
          diciembre_kilowatts: 12,
        },

        {
          package_premium: false,
          package_plus: true,
          package_basico: false,

          first_person_name: "maria",
          first_person_number: 34343434,
          first_person_email: "maria@gmail.com",
          first_person_do_taxes: true,
          first_person_dont_do_taxes: false,

          second_person_name: "luis",
          second_person_number: 3555534,
          second_person_email: "luis@gmail.com",
          second_person_do_taxes: false,
          second_person_dont_do_taxes: true,

          address: "this is an example address on application number 2",
          state: "NV",
          city: "las vegas",
          zipcode: 98433,

          house_year_built: 2002,
          house_sqrtfoot: 2000,
          house_total_floors: 2,
          family_residence: false,
          town_house: false,
          condominio: true,
          mobile_home: false,

          shingle_ceiling_type: true,
          teja_ceiling_type: false,
          barro_ceiling_type: false,
          madera_ceiling_type: false,
          plano_ceiling_type: false,

          ceiling_condition_excelent: true,
          ceiling_condition_good: false,
          ceiling_condition_pasable: false,
          ceiling_condition_old: false,

          sombreado_nada: true,
          sombreado_poco: false,
          sombreado_mucho: false,

          house_with_pool: false,
          house_with_no_pool: true,

          gate_number: "",
          hoa_exist: false,
          hoa_no_exist: true,
          hoa_information: "not record found",
          hoa_phone: 0,

          is_power_panel_close: false,
          is_power_panel_open: true,
          desc_for_panel_close: "the panel is open",
          power_panel_size: 12,

          ac_count: 2,
          heater_count: 1,
          heater_gas: true,
          heater_electric: false,
          heater_solar: false,
          have_solar_panel: false,
          dont_have_solar_panel: false,

          power_bill_acc_number: 231323132132,

          enero_cost: 55.99,
          enero_kilowatts: 12,
          febrero_cost: 55.99,
          febrero_kilowatts: 12,
          marzo_cost: 55.99,
          marzo_kilowatts: 12,
          abril_cost: 55.99,
          abril_kilowatts: 12,
          mayo_cost: 55.99,
          mayo_kilowatts: 12,
          junio_cost: 55.99,
          junio_kilowatts: 12,
          julio_cost: 55.99,
          julio_kilowatts: 12,
          agosto_cost: 55.99,
          agosto_kilowatts: 12,
          septiembre_cost: 55.99,
          septiembre_kilowatts: 12,
          octubre_cost: 55.99,
          octubre_kilowatts: 12,
          noviembre_cost: 55.99,
          noviembre_kilowatts: 12,
          diciembre_cost: 55.99,
          diciembre_kilowatts: 12,
        },
      ]);
    });
};
