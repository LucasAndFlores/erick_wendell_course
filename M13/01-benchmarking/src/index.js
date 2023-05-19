import { database } from "../database.js";
import { Cart } from "./entities/Cart.js";

const cart = new Cart(database);
console.log(cart);
