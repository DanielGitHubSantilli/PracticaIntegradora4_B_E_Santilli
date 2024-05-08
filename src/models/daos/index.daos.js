import {
      UsersMongoDAO
} from "./mongo/users/users.mongo.dao.js";

import {
      UsersMemoryDAO
} from "./memory/users/users.memory.dao.js";

import {
      ProductsMongoDAO
} from "./mongo/products/products.mongo.dao.js";

import {
      CartsMongoDAO
} from "./mongo/carts/carts.mongo.dao.js";

const usersMongoDAO = new UsersMongoDAO();
const usersMemoryDAO = new UsersMemoryDAO();
const productsMongoDAO = new ProductsMongoDAO();
const cartsMongoDAO = new CartsMongoDAO();

export const getDAOS = () => ({
      usersMongoDAO,
      usersMemoryDAO,
      productsMongoDAO,
      cartsMongoDAO
});