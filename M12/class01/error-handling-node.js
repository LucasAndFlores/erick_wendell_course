import { createServer } from "http";

let count = 0;
async function handler(request, response) {
  count++;
  try {
    let body = "";

    for await (const data of request) {
      body += data.toString();
    }

    console.log("cai no segundo", JSON.parse(body));
    response.end();
  } catch (error) {
    console.log("a server error happened", error);
    response.writeHead(500);
    response.write(JSON.stringify({ message: "internal server error" }));
    response.end();
  }
}

createServer(handler).listen(3333, () => {
  console.log("server is running at 3333");
});
