import {
      Faker,
      es
}
from '@faker-js/faker';
import {
      generateProducts
} from '../products/products.mocks.utils.js';
import {
      generateUsers
} from '../users/users.mocks.utils.js';

const customFaker = new Faker({
      locale: [es]
});

export const generateCarts = () => {

      const totalProducts = customFaker.number.int({
            min: 1,
            max: 5
      })

      const productsToAdd = Array.from({
            length: totalProducts
      }, () => generateProducts());

      const products = productsToAdd.map(product => {

            if (product.stock === 0) {

                  return {
                        error: `No hay stock del producto: ${product.title}.`
                  }

            }

            return {

                  product: product._id,
                  quantity: customFaker.number.int({
                        min: 1,
                        max: 5
                  }),
                  price: product.price

            }

      });

      const code = customFaker.string.alphanumeric({
            length: {
                  min: 6,
                  max: 12
            }
      })

      const generatedUser = generateUsers();

      const user = generatedUser._id;

      return {
            products,
            code,
            date_created,
            user
      };


}