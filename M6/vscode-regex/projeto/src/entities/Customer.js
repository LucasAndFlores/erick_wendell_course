const Base = require("./base/base");
class Customer extends Base {
  constructor({ name, id, age }) {
    super({ name, id });

    this.age = age;
  }
}

module.exports = Customer;
