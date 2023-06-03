import Sharp from "sharp";
import { createServer } from "http";
import { parse, fileURLToPath } from "url";
import { Worker } from "worker_threads";
import { dirname } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentDir}/${workerFileName}`);
    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
        );
      }

      console.log(`the thread ${worker.threadId} exited`);
    });
  });
}

async function handler(request, response) {
  if (request.url.includes("joinImages")) {
    const {
      query: { background, img },
    } = parse(request.url, true);
    const imageResponse = await joinImages({
      img,
      background,
    });

    response.writeHead(200, {
      "Content-type": "text/html",
    });
    response.end(
      `<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageResponse}" />`
    );
    return;
  }

  return response.end("ok");
}

createServer(handler).listen(4000, () => console.log("running at 4000"));
