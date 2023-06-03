import { fork } from "child_process";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { Writable } from "stream";
import csvtojson from "csvtojson";

const database = "./data/All_Pokemon.csv";
const PROCESS_COUNT = 10;
const backgroundtaskFile = "./src/backgroundTask.js";
const processes = new Map();
const replications = [];

for (let index = 0; index < PROCESS_COUNT; index++) {
  const child = fork(backgroundtaskFile, [database]);
  processes.set(child.pid, child);
  child.on("exit", () => {
    console.log(`child process ${child.pid} exited`);
    processes.delete(child.pid);
  });

  child.on("error", (error) => {
    console.log(`child process ${child.pid} has an error`, error);
    process.exit(1);
  });

  child.on("message", (msg) => {
    if (replications.includes(msg)) return;

    console.log(`child process found duplicated`, msg);
    replications.push(msg);
  });
}

function roundRobin(array, index = 0) {
  return function () {
    if (index >= array.lengt) index = 0;

    return array[index++];
  };
}

//threadpool or load balancer
const getProcess = roundRobin([...processes.values()]);
console.log(`Starting with ${processes.size} processes`);

await pipeline(
  createReadStream(database),
  csvtojson(),
  Writable({
    write(chunk, enc, cb) {
      const choosenProcess = getProcess();
      if (choosenProcess) {
        choosenProcess.send(JSON.parse(chunk));
      }
      cb();
    },
  })
);
