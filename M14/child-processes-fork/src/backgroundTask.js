import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { Transform, Writable } from "stream";
import { setTimeout } from "timers/promises";
import csvtojson from "csvtojson";

const database = process.argv[2];

async function onMessage(msg) {
  const firstTimeRan = [];
  await pipeline(
    createReadStream(database),
    csvtojson(),
    Transform({
      transform(chunk, enc, cb) {
        const data = JSON.parse(chunk);
        if (data.Name !== msg.Name) return cb();

        if (firstTimeRan.includes(msg.Name)) {
          return cb(null, msg.Name);
        }

        firstTimeRan.push(msg.Name);
        cb();
      },
    }),
    Writable({
      write(chunk, enc, cb) {
        if (!chunk) return cb();

        process.send(chunk.toString());
        cb();
      },
    })
  );
}

process.on("message", onMessage);

//to say that the process can die after have been inactive
await setTimeout(10000);
process.channel.unref();
