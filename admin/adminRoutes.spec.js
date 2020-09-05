const Admin = require("./adminModel");
const db = require("../data/config-bd");

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

// describe("POST/", () => {
//   it("should return ", async () => {
//     const newAdmin = {
//       email: "test@gmail.com",
//       password: "testing",
//       resetLink: "",
//     };

//     const response = await Admin.add(newAdmin);
//     console.log("what about now ", response);
//     expect(response.message).toBe("successfully created!");
//   });
// });

// test("POST / send new application to database", async () => {
//   const newAdmin = { email: "test@gmail.com", password: "testing" };

//   const response = await Admin.add(newAdmin);
//   console.log("what about now ", response);
//   expect(response.message).toBe("successfully created!");
// });
