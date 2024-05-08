import mongoose from 'mongoose';
import {
      AssertUtilsDAO
} from '../../../../utils/asserts.utils.js';
import {
      getDAOS
} from '../../../../../src/models/daos/index.daos.js';
import {
      createHash,
} from '../../../../../src/utils/bcrypt/bcrypt.utils.js';
import {
      mockUsers
} from '../../../../utils/mocks.utils.js';
import {
      mock
} from 'node:test';

const {
      usersMongoDAO,
} = getDAOS();

function connectToDatabase() {
      return mongoose.connect('mongodb://127.0.0.1:27017/devEnv?retryWrites=true&w=majority');
}

// Descripción del grupo de pruebas
describe('User DAO Tests', () => {

      // Creación de un usuario de prueba con la contraseña hasheada
      let mockHashedPassword = {
            ...mockUsers.mockUser,
            password: createHash(mockUsers.mockUser.password)
      };

      // Este hook se ejecuta antes de todos los tests
      before(async function () {

            await connectToDatabase();
            this.usersDao = usersMongoDAO;

      });

      // Este hook se ejecuta antes de cada test
      beforeEach(function () {
            this.timeout(5000);
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
      });

      // Se describe el grupo de pruebas de getOne y addOne
      describe(`\n getOne y addOne tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DAO inválido para getOne con un email válido, debido a que el email no existe', async function () {

                  // When
                  const result = await this.usersDao.getOne({
                        email: mockUsers.mockUser.email
                  });

                  // Then
                  AssertUtilsDAO.invalidDAO(result);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para addOn con un email válido. También debería agregar _id y date_created al usuario', async function () {

                  // When
                  const userAdded = await this.usersDao.addOne(mockHashedPassword);

                  // Then
                  AssertUtilsDAO.validDAO(userAdded);

                  AssertUtilsDAO.validEqualsDAO(userAdded, ['email', 'role', 'password'], [mockUsers.mockUser.email, 'USER', mockHashedPassword.password]);

                  AssertUtilsDAO.validTypeDAO(userAdded, ['_id', 'date_created'], ['object', 'date']);

                  mockHashedPassword = {
                        ...mockHashedPassword,
                        _id: userAdded._id,
                        date_created: userAdded.date_created,
                        role: 'PREMIUM'
                  };

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para getOne con un email válido y rol premium, debido a que el email existe', async function () {

                  // Given
                  const user = await this.usersDao.addOne(mockHashedPassword);

                  // When
                  const result = await this.usersDao.getOne({
                        email: mockUsers.mockUser.email
                  });

                  // Then
                  AssertUtilsDAO.validDAO(result);

                  AssertUtilsDAO.validEqualsDAO(result, ['email', 'role', 'password'], [mockUsers.mockUser.email, 'PREMIUM', mockHashedPassword.password]);

                  AssertUtilsDAO.validTypeDAO(result, ['_id', 'date_created'], ['object', 'date']);

            });

            it('Debería producir un DAO válido para getOne con un _id válido, debido a que el _id existe', async function () {
                  // Given
                  const userOnlyWithId = {
                        _id: mockHashedPassword._id
                  };
                  const user = await this.usersDao.addOne(mockHashedPassword);

                  // When
                  const result = await this.usersDao.getOne(userOnlyWithId);

                  // Then
                  AssertUtilsDAO.validDAO(result);

                  AssertUtilsDAO.validEqualsDAO(result, ['email', 'role', 'password'], [mockUsers.mockUser.email, 'PREMIUM', mockHashedPassword.password]);

            });

      });

      // Se describe el grupo de pruebas de updateOne
      describe(`\n updateOne tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DAO inválido para updateOne si el usuario no existe', async function () {

                  // When
                  const result = await this.usersDao.updateOne(mockUsers.mockUser);

                  // Then
                  AssertUtilsDAO.invalidDAO(result);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para updateOne con un email válido. También debería actualizar los valores de first_name y phone', async function () {

                  // Given
                  const user = await this.usersDao.addOne(mockHashedPassword);
                  const userToUpdate = {
                        ...mockUsers.mockUpdatedUser,
                        _id: user._id
                  };

                  // When
                  const result = await this.usersDao.updateOne(userToUpdate);

                  // Then
                  AssertUtilsDAO.validDAO(result);

                  AssertUtilsDAO.validEqualsDAO(result, ['first_name', 'phone'], [mockUsers.mockUpdatedUser.first_name, mockUsers.mockUpdatedUser.phone]);

                  AssertUtilsDAO.validTypeDAO(result, ['_id', 'date_created'], ['object', 'date']);

            });

      });

      // Se describe el grupo de pruebas de deleteOne
      describe(`\n deleteOne tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DAO inválido para deleteOne con un email válido, debido a que el email no existe', async function () {

                  // When
                  const result = await this.usersDao.deleteOne({
                        email: mockUsers.mockUser.email
                  });

                  // Then
                  AssertUtilsDAO.invalidDAO(result);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para deleteOne con un email válido. También debería eliminar el usuario', async function () {

                  // Given
                  const user = await this.usersDao.addOne(mockHashedPassword);

                  // When
                  const userDeleted = await this.usersDao.deleteOne({
                        email: mockUsers.mockUser.email
                  });

                  const result = await this.usersDao.getOne({
                        email: mockUsers.mockUser.email
                  });

                  // Then
                  AssertUtilsDAO.validDAO(userDeleted);

                  AssertUtilsDAO.validEqualsDAO(userDeleted, ['email', 'role', 'password'], [mockUsers.mockUser.email, 'PREMIUM', mockHashedPassword.password]);

                  AssertUtilsDAO.validTypeDAO(userDeleted, ['_id', 'date_created'], ['object', 'date']);

                  AssertUtilsDAO.invalidDAO(result);

            });

            // Descripción de la prueba
            it('Debería producir un DAO válido para deleteOne con un usuario válido. También debería eliminar el usuario', async function () {

                  // Given
                  const user = await this.usersDao.addOne(mockHashedPassword);

                  // When
                  const userDeleted = await this.usersDao.deleteOne(mockUsers.mockRegisterUser);

                  const result = await this.usersDao.getOne({
                        email: mockUsers.mockUser.email
                  });

                  // Then
                  AssertUtilsDAO.validDAO(userDeleted);

                  AssertUtilsDAO.validEqualsDAO(userDeleted, ['email', 'role', 'password'], [mockUsers.mockUser.email, 'PREMIUM', mockHashedPassword.password]);

                  AssertUtilsDAO.validTypeDAO(userDeleted, ['_id', 'date_created'], ['object', 'date']);

                  AssertUtilsDAO.invalidDAO(result);


            });

      });

});