export class Queue {
  length;
  #head;
  #tail;

  constructor() {
    this.#head = this.#tail = undefined;
    this.length = 0;
  }

  enqueue(item) {
    this.length++;
    const node = { value: item };

    if (!this.#tail) {
      this.#tail = this.#head = node;
      return;
    }

    this.#tail.next = node;
    this.#tail = node;
  }
  deque() {
    if (!this.#head) {
      return undefined;
    }

    this.length--;
    const head = this.#head;
    this.#head = this.#head.next;

    // if we don't have any garbagge collector, we should free the space
    head.next = undefined;

    if (this.length === 0) {
      this.#tail = undefined;
    }

    return head.value;
  }
  peek() {
    return this.#head?.value;
  }
}
