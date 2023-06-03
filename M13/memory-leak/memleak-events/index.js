import { createServer } from "http";
import EventEmitter from "events";
import { randomBytes } from "crypto";

const myEvent = new EventEmitter();

function getBytes() {
  return randomBytes(1000);
}

function onData() {
  getBytes();
  const items = [];
  setInterval(function myInterval() {
    items.push(Date.now());
  });
}

myEvent.on("data", onData);
createServer(function handler(request, response) {
  // myEvent.on("data", onData);

  myEvent.emit("data", Date.now());

  response.end("ok");
}).listen(3333, () => console.log("Server running at 3333"));
