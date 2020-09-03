exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pdfs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pdfs").insert([
        { application_id: 1, pdf_file: "file1", pdf_name: "example" },
        { application_id: 1, pdf_file: "file2", pdf_name: "example2" },
        { application_id: 1, pdf_file: "file3", pdf_name: "example3" },
        { application_id: 1, pdf_file: "file4", pdf_name: "example4" },
        { application_id: 2, pdf_file: "file2", pdf_name: "example5" },
        { application_id: 2, pdf_file: "file3", pdf_name: "example55" },
        { application_id: 2, pdf_file: "file1", pdf_name: "example44" },
      ]);
    });
};
