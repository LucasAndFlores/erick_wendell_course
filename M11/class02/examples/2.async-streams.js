import { pipeline } from "stream/promises";
import { setTimeout } from "timers/promises";

async function* myCustomReadable() {
  yield Buffer.from("This is my");
  await setTimeout(100);
  yield Buffer.from("custom readable");
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, "_");
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = [];
  for await (const chunk of stream) {
    console.log("[This is the duplex writable]", chunk);
    bytesRead += chunk.length;
    wholeString.push(chunk);
  }

  yield `whole string ${wholeString.join()}`;
  yield `bytes read ${bytesRead}`;
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log("[writable]", chunk.toString());
  }
}

try {
  const controller = new AbortController();
  // if you need to cancel a pipeline, you should use this
  setImmediate(() => controller.abort());

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal }
  );
} catch (error) {
  console.log("An error happened", error.message);
}
