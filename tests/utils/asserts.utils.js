import {
      expect
} from 'chai';

// Se define la clase AssertUtilsDTO
export class AssertUtilsDTO {

      // Se define la función para validar un DTO
      static validDTO(dto) {

            expect(dto.errors).to.be.undefined;

      }

      // Se define la función para validar que los valores de ciertas propiedades de un DTO, sean iguales
      static validEqualsDTO(dto, properties, values) {

            properties.forEach((property, index) => {

                  expect(dto[property]).to.equal(values[index]);

            });

      }

      // Se define la función para validar que los valores de ciertas propiedades de un DTO, no sean iguales
      static validNotEqualsDTO(dto, properties, values) {

            properties.forEach((property, index) => {

                  expect(dto[property]).to.not.equal(values[index]);

            });

      }

      // Se define la función para validar que los valores de ciertas propiedades de un DTO, sean de cierto tipo
      static validTypeDTO(dto, properties, types) {

            properties.forEach((property, index) => {

                  expect(dto[property]).to.be.a(types[index]);

            });

      }

      // Se define la función para invalidar un DTO y validar que el mensaje de error sea el esperado
      static invalidDTO(dto, message) {

            expect(dto.errors).to.not.be.undefined;

            expect(dto.errors[0]).to.equal(message);

      }

}

// Se define la clase AssertUtilsDAO
export class AssertUtilsDAO {

      // Se define la función para validar un DAO
      static validDAO(dao) {

            expect(dao).to.exist;

      };

      // Se define la función para validar que los valores de ciertas propiedades de un DAO, sean iguales
      static validEqualsDAO(dao, properties, values) {

            properties.forEach((property, index) => {

                  expect(dao[property]).to.equal(values[index]);

            });

      };

      // Se define la función para validar que los valores de ciertas propiedades de un DAO, no sean iguales
      static validNotEqualsDAO(dao, properties, values) {

            properties.forEach((property, index) => {

                  expect(dao[property]).to.not.equal(values[index]);

            });

      };

      // Se define la función para validar que los valores de ciertas propiedades de un DAO, sean de cierto tipo
      static validTypeDAO(dao, properties, types) {

            properties.forEach((property, index) => {

                  expect(dao[property]).to.be.a(types[index]);

            });

      };

      // Se define la función para invalidar un DAO.
      static invalidDAO(dao) {

            expect(dao).to.be.null

      };


};

// Se define la clase AssertUtilsRepository
export class AssertUtilsRepository {

      // Se define la función para validar si el usuario recibido es el esperado
      static validUser(user, expectedUser = {}, properties = []) {

            properties.forEach(property => {

                  expect(user[property]).to.equal(expectedUser[property]);

            });

      };

      // Se define la función para validar un Repository y su contraseña encriptada
      static validRepository(user, hashedPassword, originalPassword) {

            expect(user).to.exist;

            expect(user).to.have.property('_id');

            expect(user).to.have.property('email');

            expect(user).to.have.property('password');

            expect(user.password).to.equal(hashedPassword);

            expect(user.password).to.not.equal(originalPassword);

      };

      // Se define la función para validar si un DAO es inválido
      static invalidRepository(user) {

            expect(user).to.be.null;

      };

      static handleDTOError(error, expectedErrorMessage) {

            expect(error).to.have.property('message');

            for (let i = 0; i < expectedErrorMessage.length; i++) {
                  expect(error.message).to.include(expectedErrorMessage[i]);
            }

      };
}