import Benchmark from "benchmark";
import { Cart as CartOld } from "./cart-id-old.js";
import { Cart as CartCrypto } from "./cart-id-new.js";
import { Cart as CartRmPropOld } from "./cart-rm-prop-old.js";
import { Cart as CartRmPropNew } from "./cart-rm-prop-new.js";
import { Cart as CartPriceOld } from "./cart-price-old.js";
import { Cart as CartPriceNew } from "./cart-price-new.js";
import { database } from "../database.js";

const suite = new Benchmark.Suite();

//suite
//  .add("Cart#cartIdUUID", function () {
//    new CartOld();
//  })
//  .add("Cart#cartIdCrypto", function () {
//    new CartCrypto();
//  })
//  .on("cycle", (event) => {
//    console.log(String(event.target));
//  })
//  .on("complete", function () {
//    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//  })
//  .run();
//
//const data = {
//  products: [
//    {
//      id: "ae",
//      n: undefined,
//      abc: undefined,
//      shit: null,
//      b: 123,
//    },
//    {
//      id: "ae",
//      n: undefined,
//      abc: undefined,
//      shit: null,
//      b: 123,
//    },
//  ],
//};
//
//suite
//  .add("Cart#rmEmptyPropsMapReduce", function () {
//    new CartRmPropOld(data);
//  })
//  .add("Cart#rmEmptyPropsFor", function () {
//    new CartRmPropNew(data);
//  })
//  .on("cycle", (event) => {
//    console.log(String(event.target));
//  })
//  .on("complete", function () {
//    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//  })
//  .run({ async: true });
//

suite
  .add("Cart#calcPriceMapReduce", function () {
    new CartPriceOld(database);
  })
  .add("Cart#calPriceFor", function () {
    new CartPriceNew(database);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
