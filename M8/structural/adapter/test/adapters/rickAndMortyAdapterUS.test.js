import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { RickAndMortyUSAdapter } from "../../src/business/adapters/rickAndMortyUSAdapter";
import { RickAndMortyUS } from "../../src/business/integrations/rickAndMortyUS";

describe("#RickAndMortyUSAdapter", () => {
  beforeEach(() => jest.clearAllMocks());
  test("#getCharacters should be an adapter for RickAndMortyBRL.getCharactersFromJson", async () => {
    const usIntegration = jest
      .spyOn(RickAndMortyUS, RickAndMortyUS.getCharactersFromXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAdapter.getCharacters();
    expect(result).toEqual([]);
    expect(usIntegration).toHaveBeenCalled();
  });
});
