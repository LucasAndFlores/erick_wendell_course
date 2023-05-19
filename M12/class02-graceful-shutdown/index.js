import { MongoClient } from "mongodb";
import { createServer } from "http";
import { promisify } from "util";

async function dbConnect() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  console.log("mongodb is connected");
  const db = client.db("comics");
  return {
    collections: { heroes: db.collection("heroes") },
    client,
  };
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
  try {
    for await (const data of request) {
      const hero = JSON.parse(data);
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toUTCString(),
      });

      const heroes = await collections.heroes.find().toArray();
      console.log({ heroes });
      response.writeHead(200);
      response.write(JSON.stringify(heroes));
    }
  } catch (error) {
    console.log("an erro happened", error);
    response.writeHead(500);
    response.write(JSON.stringify({ message: "internal server error" }));
  } finally {
    response.end();
  }
}

// curl -i localhost:3000 -X POST --data '{"name": "batman", "age": "50"}'

const server = createServer(handler).listen(3000, () => {
  console.log("server is running at 3000", process.pid);
});

async function onStop(signal) {
  console.info(`\n ${signal} signal received`);

  console.log("Closing http server");
  await promisify(server.close.bind(server))();
  console.log("Http server has closed!");

  await client.close();
  console.log("mongodb connection has closed!");
  //zero is ok, 1 is error
  process.exit(0);
}

["SIGINT", "SIGTERM"].forEach((event) => {
  process.on(event, onStop);
});
