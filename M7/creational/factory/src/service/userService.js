class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async find(query) {
    const user = await this.userRepository.find(query);
    return user.map((item) => ({ ...item, name: item.name.toUpperCase() }));
  }
}

module.exports = UserService;
