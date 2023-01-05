const User = require("./user");
const { readFile } = require("fs/promises");
const { error } = require("./constants");

const DEFAULT_OPTIONS = {
  maxLines: 4,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filepath) {
    const content = await this.getFileContent(filepath);
    // const validation = this.isValid(content);
    // if (!validation.valid) throw new Error(validation.error);

    const user = this.parseCsvToJson(content);

    return user;
  }

  static async getFileContent(filepath) {
    return (await readFile(filepath)).toString("utf8");
  }

  // static isValid(csvToString, options = DEFAULT_OPTIONS) {
  //   const [headers, ...restOfContent] = csvToString.split("\n");
  //   const isHeaderValid = headers === options.fields.join(",");
  //   if (!isHeaderValid) {
  //     return {
  //       error: error.FILE_FIELDS_ERROR_MESSAGE,
  //       valid: false,
  //     };
  //   }

  //   const contentSizeNotAccepted =
  //     restOfContent.length > 1 && restOfContent.length <= options.maxLines;

  //   if (!contentSizeNotAccepted) {
  //     return {
  //       error: error.FILE_LENGTH_ERROR_MESSAGE,
  //       valid: false,
  //     };
  //   }

  //   return { valid: true };
  // }

  static parseCsvToJson(csvString) {
    const lines = csvString.split("\n");

    const obj = {
      variantId: 93847,
      productFilter: {
        retailer_id: {
          i_is_any: [],
        },
      },
    };

    const firstLine = lines.shift();
    const header = firstLine.split(",");
    lines.map((line) => {
      const columns = line.split(",");

      console.log(columns);
      obj.productFilter.retailer_id.i_is_any.push(columns[0]);
    });

    return obj;
  }
}

module.exports = File;
