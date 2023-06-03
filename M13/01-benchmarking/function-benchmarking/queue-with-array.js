export class Queue {
  #queue;
  length;

  constructor() {
    this.#queue = [];
    this.length = this.#queue.length;
  }

  enqueue(item) {
    this.#queue.push(item);
  }

  deque() {
    return this.#queue.shift();
  }

  peek() {
    return this.#queue[0];
  }
}
