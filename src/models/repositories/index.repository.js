import {
      UsersRepository
} from "./users/users.repository.js";
import {
      ProductsRepository
} from "./products/products.repository.js";
import {
      CartsRepository
} from "./carts/carts.repository.js";

const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();
const cartsRepository = new CartsRepository();

export const getRepositories = () => ({
      usersRepository,
      productsRepository,
      cartsRepository
});