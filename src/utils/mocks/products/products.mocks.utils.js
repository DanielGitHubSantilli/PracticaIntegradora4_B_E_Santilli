import {
      Faker,
      faker,
      es
}
from '@faker-js/faker';

const customFaker = new Faker({
      locale: [es]
});

export const generateProducts = () => {

      return {
            title: customFaker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: customFaker.string.alphanumeric({
                  length: {
                        min: 6,
                        max: 12
                  }
            }),
            price: customFaker.commerce.price(),
            stock: customFaker.number.int({
                  min: 0,
                  max: 100
            }),
            category: customFaker.commerce.department(),
            thumbnails: customFaker.helpers.arrayElements([customFaker.image.urlLoremFlickr({
                  width: 128,
                  height: 128
            }), customFaker.image.urlLoremFlickr({
                  width: 128,
                  height: 128
            }), customFaker.image.urlLoremFlickr({
                  width: 128,
                  height: 128
            })]),
            id: customFaker.number.int({
                  min: 1,
                  max: 500
            }),
      }

}