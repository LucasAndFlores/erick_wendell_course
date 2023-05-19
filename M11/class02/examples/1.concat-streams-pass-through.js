import axios from "axios";
import { PassThrough, Writable } from "stream";
const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const requests = await Promise.all([
  axios.get(API_01, { responseType: "stream" }),
  axios.get(API_02, { responseType: "stream" }),
]);

const results = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, "");

    // ?= positive look a head
    // <name> = named tag

    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log("name", name.toLowerCase(), "data", data);
    callback();
  },
});

function mergeStreams(streams) {
  return streams.reduce((previous, current, index, items) => {
    //prevent the stream to close itself
    current.pipe(previous, { end: false });

    current.on("end", () => items.every((s) => s.ended && previous.end()));

    return previous;
  }, new PassThrough());
}

mergeStreams(results).pipe(output);
