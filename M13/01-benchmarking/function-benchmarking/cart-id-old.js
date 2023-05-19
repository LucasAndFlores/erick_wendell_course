import { v4 as uuid } from "uuid";

export class Cart {
  constructor() {
    this.id = uuid();
  }
}
