export class Queue {
  #queue;
  length;

  constructor() {
    this.#queue = new Set();
    this.length = this.#queue.size;
  }

  enqueue(item) {
    this.#queue.add(item);
  }

  deque() {
    const element = this.#queue.values().next().value;

    this.#queue.delete(this.#queue.values().next().value);
    return element;
  }

  peek() {
    return this.#queue.values().next().value;
  }
}
