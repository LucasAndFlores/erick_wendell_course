class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async connect() {
    await this.sleep();
    return this;
  }

  async find(query) {
    await this.sleep();
    return [{ name: "lucas" }];
  }
}

module.exports = Database;
