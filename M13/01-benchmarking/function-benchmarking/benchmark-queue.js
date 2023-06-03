import Benchmark from "benchmark";
import { Queue as QueueNode } from "./queue-with-node.js";
import { Queue as QueueInterator } from "./queue-with-interator.js";
import { Queue as QueueArray } from "./queue-with-array.js";

const suite = new Benchmark.Suite();

suite
  .add("Queue#usingNode", function () {
    const queue = new QueueNode();
    for (let index = 0; index < 100000; index++) {
      queue.enqueue({
        id: `${new Date().toISOString()}-${index}`,
        name: `lucas-${index}`,
      });
    }

    for (let index = 0; index < 100000; index++) {
      queue.deque();
    }
  })
  .add("Queue#usingSet", function () {
    const queue = new QueueInterator();

    for (let index = 0; index < 100000; index++) {
      queue.enqueue({
        id: `${new Date().toISOString()}-${index}`,
        name: `lucas-${index}`,
      });
    }

    for (let index = 0; index < 100000; index++) {
      queue.deque();
    }
  })
  .add("Queue#usingArray", function () {
    const queue = new QueueArray();

    for (let index = 0; index < 100000; index++) {
      queue.enqueue({
        id: `${new Date().toISOString()}-${index}`,
        name: `lucas-${index}`,
      });
    }

    for (let index = 0; index < 100000; index++) {
      queue.deque();
    }
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
