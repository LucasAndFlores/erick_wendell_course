export default class Util {
  static #transform({ str: [first, ...rest], uppperCase = true }) {
    if (!first) return "";
    const firstLetter = uppperCase ? first.toUpperCase() : first.toLowerCase();

    return [firstLetter, ...rest].join("");
  }
  static upperCaseFirstLetter(str) {
    return Util.#transform({ str });
  }

  static lowerCaseFirstLetter(str) {
    return Util.#transform({ str, uppperCase: false });
  }
}
