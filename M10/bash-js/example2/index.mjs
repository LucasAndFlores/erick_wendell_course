$.verbose = false;

import { setTimeout } from "timers/promises";
import isSafe from "safe-regex";

await $`docker run -p 8080:80 -d nginx`;

await setTimeout(500);

const req = await $`curl --silent localhost:8080`;

console.log("req \n", req.stdout);

const containers = await $`docker ps`;

// ?<name> you can name your groups using regex
// the (?=) is positive look behind, looking behind for what you searching

const expression = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(expression)) throw new Error("unsafe regex");

const {
  groups: { containerId },
} = containers.toString().match(expression);

const logs = await $`docker logs ${containerId}`;
console.log("logs \n", logs.stdout);

const remove = await $`docker rm -f ${containerId}`;
console.log("rm \n", remove.stdout);
