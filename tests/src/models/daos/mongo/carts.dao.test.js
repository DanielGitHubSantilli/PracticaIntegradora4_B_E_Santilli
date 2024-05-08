import mongoose from 'mongoose';
import {
      AssertUtilsDAO
} from '../../../../utils/asserts.utils.js';
import {
      getDAOS
} from '../../../../../src/models/daos/index.daos.js';
import {
      mockCarts,
      mockUsers,
      mockProducts
} from '../../../../utils/mocks.utils.js';

const {
      cartsMongoDAO,
      productsMongoDAO,
      usersMongoDAO
} = getDAOS();

function connectToDatabase() {
      return mongoose.connect('mongodb://127.0.0.1:27017/devEnv?retryWrites=true&w=majority');
}

// Descripción del grupo de pruebas
describe('Cart DAO Tests', () => {

      // Este hook se ejecuta antes de todos los tests
      before(async function () {

            await connectToDatabase();
            this.cartsDao = cartsMongoDAO;
            this.productsDao = productsMongoDAO;
            this.usersDao = usersMongoDAO;



      });

      // Este hook se ejecuta antes de cada test
      beforeEach(async function () {

            this.timeout(5000);

            const user = await this.usersDao.addOne(mockUsers.mockRegisterUser);
            mockCarts.mockCart.user = user._id;

            const product = await this.productsDao.saveProduct(mockProducts.mockProduct);
            mockCarts.mockCart.products[0] = {
                  product: product._id,
                  quantity: 1,
                  price: product.price,
            }

      });

      // Este hook se ejecuta después de todos los tests
      after(async function () {

            await mongoose.connection.close();
      });

      // Este hook se ejecuta después de cada test
      afterEach(async function () {

            if (await mongoose.connection.collections.users.findOne({
                        email: mockUsers.mockUser.email
                  })) {
                  await mongoose.connection.collections.users.drop();
            };

            if (await mongoose.connection.collections.products.findOne({
                        id: mockProducts.mockProduct.id
                  })) {
                  await mongoose.connection.collections.products.drop();
            };

            if (await mongoose.connection.collections.carts.findOne({
                        code: mockCarts.mockCart.code
                  })) {
                  await mongoose.connection.collections.carts.drop();
            };

      });

      // Se describe el grupo de pruebas de getAll, getOne y saveOne
      describe(`\n getAll, getOne y saveOne tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DAO válido para getAll con un array vacío', async function () {

                  // When
                  const result = await this.cartsDao.getAll();

                  // Then
                  AssertUtilsDAO.validDAO(result);

                  AssertUtilsDAO.validEqualsDAO(result, ['length'], [0]);

            });

            // Descripción de la prueba
            it('Debería producir un DAO inválido para getOne con un código válido, debido a que el código no existe', async function () {

                  // When
                  const result = await this.cartsDao.getOne({
                        code: mockCarts.mockCart.code
                  });

                  // Then
                  AssertUtilsDAO.invalidDAO(result);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para saveOne con un carrito válido con un usuario válido. También debería agregar _id y date_created al carrito', async function () {

                  // When
                  const cartAdded = await this.cartsDao.saveOne(mockCarts.mockCart);

                  // Then
                  AssertUtilsDAO.validDAO(cartAdded);

                  AssertUtilsDAO.validEqualsDAO(cartAdded, ['code', 'user'], [mockCarts.mockCart.code, mockCarts.mockCart.user]);

                  AssertUtilsDAO.validTypeDAO(cartAdded, ['_id', 'date_created'], ['object', 'date']);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para getAll con un array con un carrito completo', async function () {

                  // Given
                  await this.cartsDao.saveOne(mockCarts.mockCart);

                  // When
                  const result = await this.cartsDao.getAll();

                  // Then
                  AssertUtilsDAO.validDAO(result);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para getOne con un código válido, debido a que el código existe', async function () {

                  // Given
                  await this.cartsDao.saveOne(mockCarts.mockCart);

                  // When
                  const result = await this.cartsDao.getOne({
                        code: mockCarts.mockCart.code
                  });

                  // Then
                  AssertUtilsDAO.validDAO(result);

                  AssertUtilsDAO.validEqualsDAO(result, ['code'], [mockCarts.mockCart.code]);

                  AssertUtilsDAO.validTypeDAO(result, ['_id', 'date_created'], ['object', 'date']);

            });

      });

      // Se describe el grupo de pruebas de addProduct y deleteProduct
      describe(`\n addProduct y deleteCart tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DAO válido para addProduct con un código válido y un producto válido. También debería agregar _id y date_created al carrito', async function () {

                  // Given
                  await this.cartsDao.saveOne(mockCarts.mockCart);

                  // When
                  const cartAdded = await this.cartsDao.addProduct(mockCarts.mockCart.code, mockCarts.mockCart.products[0]);

                  // Then
                  AssertUtilsDAO.validDAO(cartAdded);

                  AssertUtilsDAO.validEqualsDAO(cartAdded, ['code'], [mockCarts.mockCart.code]);

                  AssertUtilsDAO.validTypeDAO(cartAdded, ['_id', 'date_created'], ['object', 'date']);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para deleteCart con un código válido.', async function () {

                  // Given
                  await this.cartsDao.saveOne(mockCarts.mockCart);

                  // When
                  const cartAdded = await this.cartsDao.deleteCart(mockCarts.mockCart);

                  const result = await this.cartsDao.getOne({
                        code: mockCarts.mockCart.code
                  });

                  // Then
                  AssertUtilsDAO.validDAO(cartAdded);

                  AssertUtilsDAO.invalidDAO(result);

            });

      });

});