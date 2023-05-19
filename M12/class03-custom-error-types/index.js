import { createServer } from "http";
import { BusinessError } from "./errors/businessError.js";

function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError("Age must be higher than 20!");
  }

  if (hero?.name.length < 4) {
    throw new BusinessError("Name should have more than 4 carachters");
  }
}

async function handler(request, response) {
  try {
    for await (const data of request) {
      const hero = JSON.parse(data);
      validateHero(hero);
      console.log({ hero });
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
