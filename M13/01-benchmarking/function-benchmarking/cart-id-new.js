import { randomUUID as uuid } from "crypto";

export class Cart {
  constructor() {
    this.id = uuid();
  }
}
