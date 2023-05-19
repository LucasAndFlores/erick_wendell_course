import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import axios from "axios";
import { readFile } from "fs/promises";
import { RickAndMortyBRL } from "../../src/business/integrations/rickAndMortyBRL";
import { Character } from "../../src/entities/character";

describe("#RickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());
  test("#getCharactersFromJson should return a list of Character Entity", async () => {
    const response = JSON.parse(await readFile("./test/mocks/characters.json"));
    const expected = response.results.map((char) => new Character(char));
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });
  test("#getCharactersFromJson should return an empty array if the API returns nothing", async () => {
    const response = JSON.parse(
      await readFile("./test/mocks/characters-empty.json")
    );
    const expected = response.results;
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });
});
