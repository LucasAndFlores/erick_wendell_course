import { Product } from "../src/entities/Product.js";

export class Cart {
  constructor({ at, products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(products);
      if (!keys.length) continue;
      // 2
      //  keys.forEach((key) => product[key] || delete product[key]);

      // 3
      keys.forEach(
        (key) => product[key] || Reflect.deleteProperty(product, key)
      );
      // 4
      //   let newObject = {};
      //   keys.forEach((key) => {
      //     if (!keys[key]) return;

      //     newObject[key] = keys[key];
      //   });

      result.push(new Product(product));
      // 1
      // result.push(JSON.parse(JSON.stringify(new Product(product))));
    }

    return result;
  }
}
