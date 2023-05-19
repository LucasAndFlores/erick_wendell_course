import { RickAndMortyUS } from "../integrations/rickAndMortyUS.js";

export class RickAndMortyUSAdapter {
  static async getCharacters() {
    return RickAndMortyUS.getCharactersFromXML();
  }
}
