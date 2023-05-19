import http from "http";
import { injectHttpInterceptor } from "../src/agent.js";

injectHttpInterceptor();

function handleRequest(request, response) {
  response.end("Hello world");
}

const server = http.createServer(handleRequest);
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at ${server.address().port}`);
});
