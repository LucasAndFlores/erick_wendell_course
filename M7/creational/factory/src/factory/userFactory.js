const UserRepository = require("../repository/userRepository");
const UserService = require("../service/userService");
const Database = require("../util/database");

class UserFactory {
  static async createInstance() {
    const db = new Database({ connectionString: "pgsql://localhost" });
    const dbConnection = await db.connect();
    const userRepository = new UserRepository({ dbConnection });
    const userService = new UserService({ userRepository });

    return userService;
  }
}

module.exports = UserFactory;
