import { createServer } from "http";
import { HeroEntity } from "./hero.js";

async function handler(request, response) {
  try {
    for await (const data of request) {
      const parsedData = JSON.parse(data);
      const hero = new HeroEntity(parsedData);
      console.log({ hero });

      if (!hero.isValid()) {
        response.writeHead(400);
        response.end(hero.notifications.join("\n"));
        continue;
      }

      response.writeHead(200);
      response.end();
    }
  } catch (error) {
    console.log(error);
    if (error instanceof BusinessError) {
      response.writeHead(400);
      response.end(JSON.stringify(error.message));
    }
    response.writeHead(500);
    response.end();
  }
}

createServer(handler).listen(3000, () => console.log("running at 3000"));
