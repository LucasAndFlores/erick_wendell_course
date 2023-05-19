const Product = require("../../src/entities/Product")

class ProductDataBuilder {
  constructor() {
    this.productData = {
      id: "0001",
      name: "computer",
      price: 1000,
      category: "electronic",
    }
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  withInvalidCategory() {
    this.productData.category = "mechanic"

    return this
  }

  withInvalidPrice() {
    this.productData.price = 2000

    return this
  }

  withInvalidId() {
    this.productData.id = "1"

    return this
  }

  withInvalidName() {
    this.productData.name = "abc123"

    return this
  }

  build() {
    const product = new Product(this.productData)
    return product
  }
}

module.exports = ProductDataBuilder
