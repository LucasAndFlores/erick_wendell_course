#!/home/lucasandrade/.nvm/versions/node/v18.12.1/bin/node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });

const { argv } = yargs(hideBin(process.argv)).command(
  "createHero",
  "create a hero",
  (builder) => {
    return builder
      .option("name", {
        alias: "n",
        describe: "hero name",
        type: "string",
        demandOption: true,
      })
      .option("age", {
        alias: "a",
        describe: "hero age",
        type: "number",
        demandOption: true,
      })
      .option("power", {
        alias: "p",
        describe: "hero power",
        type: "string",
        demandOption: true,
      })
      .example(
        "createHero --name thor --age 20 --power thunder",
        "create a hero"
      )
      .example("createHero -n thor -a 20 -p thunder", "create a hero");
  }
);

console.log(hero(argv));
