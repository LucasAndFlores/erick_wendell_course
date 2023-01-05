const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");
const { writeFile } = require("fs/promises");
const { join } = require("path");

(async () => {
  {
    const filePath = "./mocks/test-productIds.csv";
    const result = await File.csvToJson(filePath);

    writeFile(
      join(__dirname, "file-with-product-ids.json"),
      JSON.stringify(result)
    );

    // console.log(result);
  }

  // {
  //   const filePath = "./mocks/fouritems-invalid.csv";
  //   const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
  //   const result = File.csvToJson(filePath);
  //   rejects(result, rejection);
  // }

  // {
  //   const filePath = "./mocks/threeitems-valid.csv";
  //   const result = await File.csvToJson(filePath);
  //   const expected = [
  //     {
  //       name: "Lucas Andrade",
  //       id: 123,
  //       profession: "Javascript",
  //       birthDay: 1993,
  //     },
  //     {
  //       name: "Martin Veselosky",
  //       id: 456,
  //       profession: "Python",
  //       birthDay: 1991,
  //     },
  //     {
  //       name: "Xuxa",
  //       id: 789,
  //       profession: "Java Developer",
  //       birthDay: 1974,
  //     },
  //     {
  //       name: undefined,
  //       id: NaN,
  //       profession: undefined,
  //       birthDay: NaN,
  //     },
  //   ];

  //   deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  // }
})();
