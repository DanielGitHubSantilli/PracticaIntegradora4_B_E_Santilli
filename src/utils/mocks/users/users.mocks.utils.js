import {
      Faker,
      faker,
      es
}
from '@faker-js/faker';

const customFaker = new Faker({
      locale: [es]
});

export const generateUsers = () => {

      const role = 'user';

      const dateCreated = Date.now();

      const password = customFaker.internet.password();

      return {

            first_name: customFaker.person.firstName(),
            last_name: customFaker.person.lastName(),
            email: customFaker.internet.email(),
            age: customFaker.number.int({
                  min: 18,
                  max: 100
            }),
            password: password,
            confirm_password: password,

      }

}