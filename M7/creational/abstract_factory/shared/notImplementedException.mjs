export default class NotImplementedException extends Error {
  constructor(message) {
    super(`the '${message}' was not implemented`);
    this.name = "NotImplementedException";
  }
}
