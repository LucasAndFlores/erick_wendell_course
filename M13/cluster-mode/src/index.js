import { cpus } from "os";
import cluster from "cluster";
import { initializeServer } from "./server.js";

(() => {
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }

  const cpuNumbers = cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${cpuNumbers} CPU\n`);

  for (let index = 0; index < cpuNumbers; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
})();
