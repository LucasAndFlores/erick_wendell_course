import { Product } from "../src/entities/Product.js";

export class Cart {
  constructor({ at, products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length)
      .map((product) => new Product(product));

    return JSON.parse(JSON.stringify(productsEntities));
  }
}
