// create a file with 1GB
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import { createReadStream } from "fs";
import http from "http";

http
  .createServer((req, res) => {
    //this is common, but could cause errors because is not processed by demand (too much for node js do using memory)
    //   const file = readFileSync("big.file").toString();
    //   res.write(file);
    //   res.end();

    createReadStream("big.file").pipe(res);
  })
  .listen(3000, () => {
    console.log("server is running");
  });
