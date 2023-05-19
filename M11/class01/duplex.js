import { Duplex } from "stream";

let count = 0;
const server = new Duplex({
  objectMode: true, // allow you to not work with buffer, but spend more memory!
  encoding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Lucas [${count}]`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };
    setInterval(function () {
      everySecond(this);
    });
  },
  // write function works independently from read, is like a different object
  write(chunk, enconding, cb) {
    console.log(`[Writable] saving`, chunk);
    cb();
  },
});

//you can use write function
server.write("[duplex]: hey this is a writable function\n");

//you can also use on to read from the read function
//server.on("data", (msg) => console.log(`[readable]: ${msg}`));

//you can also use directly push to send more data
server.push(`[duplex]: Hey, I'm sending more data to you\n`);

//not affect read function
//server.pipe(process.stdout);

// redirect all the data from the readable to the writable in the duplex
server.pipe(server);
