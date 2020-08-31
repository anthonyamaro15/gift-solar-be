exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pdfs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pdfs").insert([
        { application_id: 1, pdf_file: "file1" },
        { application_id: 1, pdf_file: "file2" },
        { application_id: 1, pdf_file: "file3" },
        { application_id: 1, pdf_file: "file4" },
        { application_id: 2, pdf_file: "file2" },
        { application_id: 2, pdf_file: "file3" },
        { application_id: 2, pdf_file: "file1" },
      ]);
    });
};
