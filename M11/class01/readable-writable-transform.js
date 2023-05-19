import { createWriteStream } from "fs";
import { Readable, Transform, Writable } from "stream";

const readable = Readable({
  // readable is the source of information
  read() {
    for (let index = 0; index < 1e6; index++) {
      const person = { id: Date.now() + index, name: `Lucas-${index}` };
      const data = JSON.stringify(person);
      this.push(data);
    }
    this.push(null); // end the readable stream
  },
});

// process the data
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;

    cb(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;

    cb(null, "id,name\n".concat(chunk));
  },
});

// always the output
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());

    cb();
  },
});

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  //.pipe(writable)
  .pipe(createWriteStream("my.csv"));

pipeline.on("end", () => {
  console.log("ended!");
});
