import { RickAndMortyBRLAdapter } from "./business/adapters/rickAndMortyBRLAdapter.js";
import { RickAndMortyUSAdapter } from "./business/adapters/rickAndMortyUSAdapter.js";

const allData = [RickAndMortyUSAdapter, RickAndMortyBRLAdapter].map(
  (integration) => integration.getCharacters()
);

const allPromises = await Promise.allSettled(allData);

const success = allPromises
  .filter(({ status }) => status === "fulfilled")
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), []);

console.table(success);
