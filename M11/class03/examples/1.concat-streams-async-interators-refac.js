import axios from "axios";
import { pipeline } from "stream/promises";
import { Writable } from "stream";

const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const requests = await Promise.all([
  axios.get(API_01, { responseType: "stream" }),
  axios.get(API_02, { responseType: "stream" }),
]);

const results = requests.map(({ data }) => data);

//writable stream
async function* output(stream) {
  for await (const data of stream) {
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log("name", name.toLowerCase(), "data", data);
  }
}

//passthrough stream
async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding("utf-8");

    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line;
      }
    }
  }
}

await pipeline(merge(results), output);
