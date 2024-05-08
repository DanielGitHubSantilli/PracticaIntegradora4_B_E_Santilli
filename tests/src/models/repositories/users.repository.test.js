import mongoose from 'mongoose';
import {
      AssertUtilsDTO,
      AssertUtilsDAO,
      AssertUtilsRepository
} from '../../../utils/asserts.utils.js';
import {
      getDTOS
} from '../../../../src/models/dtos/index.dtos.js';
import {
      mockUsers
} from '../../../utils/mocks.utils.js';
import {
      getDAOS
} from '../../../../src/models/daos/index.daos.js';
import {
      getRepositories
} from '../../../../src/models/repositories/index.repository.js';
import {
      compareHash
} from '../../../../src/utils/bcrypt/bcrypt.utils.js';

const {
      GetUserDTO,
      LoadUserDTO,
      SaveUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
      CreateResetTokenDTO,
      ResetPasswordDTO,
} = getDTOS();

const {
      usersMongoDAO,
} = getDAOS();

let usersRepository

function connectToDatabase() {
      return mongoose.connect('mongodb://127.0.0.1:27017/devEnv?retryWrites=true&w=majority');
}

// Seccion de pruebas
describe('User Repository Tests', () => {

      // Este hook se ejecuta antes de todos los tests
      before(async function () {

            await connectToDatabase();
            usersRepository = getRepositories().usersRepository;

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

            // Se define el test para getOne
            it('Debería producir un DAO inválido y un Repository inválido para getOne con un email válido, debido a que el email no existe', async function () {

                  const user = await usersRepository.getOne({
                        email: mockUsers.mockUser.email
                  });

                  AssertUtilsDAO.invalidDAO(user);

                  AssertUtilsRepository.invalidRepository(user);

            });

            // Se define el test para addOne
            it('Debería producir un DTO válido, un DAO válido y un Repository válido para addOne con un usuario válido', async function () {

                  const user = await usersRepository.addOne(mockUsers.mockRegisterUser);

                  AssertUtilsDTO.validDTO(user);
                  AssertUtilsDAO.validDAO(user);

            });

            // Se define el test para addOne
            it('Debería producir un DTO válido, un DAO válido y un Repository válido para addOne con un usuario válido y role premium', async function () {

                  try {

                        const user = await usersRepository.addOne(mockUsers.mockPremiumUser);

                        AssertUtilsRepository.validUser(user, mockUsers.mockPremiumUser, ['email', 'role']);

                        AssertUtilsRepository.validRepository(user, user.password, mockUsers.mockRegisterUser.password);


                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, 'El usuario ya existe');

                  }

            });

            // Se define el test para addOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para addOne con un usuario válido pero con email inválido', async function () {

                  try {

                        const user = await usersRepository.addOne(mockUsers.mockUserEmailWrong);

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['Se requiere un email valido']);
                  }

            });

            // Se define el test para addOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para addOne con un usuario válido pero con password inválido', async function () {

                  try {

                        const user = await usersRepository.addOne({
                              ...mockUsers.mockUserPassWrong,
                              password: '1234567'
                        });

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['La contraseña debe tener al menos 8 caracteres']);
                  }

            });

            // Se define el test para addOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para addOne con un usuario válido pero con confirm_password inválido', async function () {

                  try {

                        const user = await usersRepository.addOne(mockUsers.mockUserConfirmPassWrong);

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['Las contraseñas no coinciden']);
                  }

            });

            // Se define el test para addOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para addOne con un usuario válido pero que ya existe', async function () {

                  try {

                        const user = await usersRepository.addOne(mockUsers.mockUserEmailWrong);

                        const user2 = await usersRepository.addOne(mockUsers.mockUserEmailWrong);

                        AssertUtilsRepository.validUser(user, mockUsers.mockPremiumUser, ['email', 'role']);
                        AssertUtilsRepository.invalidRepository(user2);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['Se requiere un email valido']);

                  }

            });

      });

      // Se describe el grupo de pruebas de loginOne
      describe(`\n loginOne tests \n`, () => {

            // Se define el test para loginOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para loginOne con un usuario válido pero con password inválido', async function () {

                  try {

                        const user = await usersRepository.addOne(mockUsers.mockRegisterUser);

                        const user2 = await usersRepository.loginOne({
                              ...mockUsers.mockRegisterUser,
                              password: '1234567'
                        }, user);

                        AssertUtilsRepository.invalidRepository(user2);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['Contraseña incorrecta']);
                  }

            });

            // Se define el test para loginOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para loginOne con un usuario válido pero con email inválido', async function () {

                  try {

                        const user = await usersRepository.addOne(mockUsers.mockRegisterUser);

                        const user2 = await usersRepository.loginOne(mockUsers.mockUserEmailWrong, user);

                        AssertUtilsRepository.invalidRepository(user2);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['Se requiere un email valido']);
                  }

            });

            // Se define el test para loginOne
            it('Debería producir un DTO válido, un DAO válido y un Repository válido para loginOne con un usuario válido', async function () {

                  const user = await usersRepository.addOne(mockUsers.mockRegisterUser);

                  const user2 = await usersRepository.loginOne(mockUsers.mockRegisterUser, user);

                  AssertUtilsDTO.validDTO(user2);
                  AssertUtilsDAO.validDAO(user2);

            });

      });

      // Se describe el grupo de pruebas de updateOne
      describe(`\n updateOne tests \n`, () => {

            // Se define el test para updateOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para updateOne con un usuario que no existe', async function () {

                  try {

                        const user = await usersRepository.updateOne(null, mockUsers.mockUpdatedUser);

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['El usuario que se intenta actualizar, no existe']);
                  }

            });

            // Se define el test para updateOne
            it('Debería producir un DTO válido, un DAO válido y un Repository válido para updateOne con un email válido. También debería actualizar los valores de first_name y phone', async function () {

                  const user = await usersRepository.addOne(mockUsers.mockRegisterUser);

                  const user2 = await usersRepository.updateOne(user, mockUsers.mockUpdatedUser);

                  AssertUtilsDTO.validDTO(user2);
                  AssertUtilsDAO.validDAO(user2);

                  AssertUtilsRepository.validUser(user2, ['first_name', 'phone'], [mockUsers.mockUpdatedUser.first_name, mockUsers.mockUpdatedUser.phone]);

            });

      });

      // Se describe el grupo de pruebas de deleteOne
      describe(`\n deleteOne tests \n`, () => {

            // Se define el test para deleteOne
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para deleteOne con un email válido, debido a que el email no existe', async function () {

                  try {

                        const user = await usersRepository.deleteOne({
                              email: mockUsers.mockUser.email
                        });

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['El usuario que se intenta eliminar, no existe']);
                  }

            });

            // Se define el test para deleteOne
            it('Debería producir un DTO válido, un DAO válido y un Repository válido para deleteOne con un email válido. También debería eliminar el usuario', async function () {

                  const user = await usersRepository.addOne(mockUsers.mockRegisterUser);

                  const user2 = await usersRepository.deleteOne({
                        email: mockUsers.mockRegisterUser.email
                  });

                  AssertUtilsDTO.validDTO(user2);
                  AssertUtilsDAO.validDAO(user2);

                  AssertUtilsRepository.validUser(user2, mockUsers.mockRegisterUser, ['email']);

                  AssertUtilsRepository.validRepository(user2, user2.password, mockUsers.mockRegisterUser.password);

            });

      });

      // Se describe el grupo de pruebas de loginAdmin
      describe(`\n loginAdmin tests \n`, () => {

            // Se define el test para loginAdmin
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para loginAdmin con un usuario válido pero con password inválido', async function () {

                  try {

                        const user = await usersRepository.loginAdmin({
                              ...mockUsers.mockLoginAdminUser,
                              password: '1234567'
                        });

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ['Contraseña incorrecta']);
                  }

            });

            // Se define el test para loginAdmin
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para loginAdmin con un usuario válido pero con email inválido', async function () {

                  try {

                        const user = await usersRepository.loginAdmin(mockUsers.mockUserEmailWrong, mockUsers.mockAdminUser);

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ["El usuario que se intenta cargar, no existe"]);
                  }

            });

            // Se define el test para loginAdmin
            it('Debería producir un DTO válido, un DAO válido y un Repository válido para loginAdmin con un usuario válido', async function () {

                  const user = await usersRepository.loginAdmin(mockUsers.mockLoginAdminUser, mockUsers.mockAdminUser);

                  AssertUtilsDTO.validDTO(user);
                  AssertUtilsDAO.validDAO(user);

            });

      });

      // Se describe el grupo de pruebas de createResetToken
      describe(`\n createResetToken tests \n`, () => {

            // Se define el test para createResetToken
            it('Debería producir un DTO con error, un DAO inválido y un Repository inválido para createResetToken con un usuario válido pero con email inválido', async function () {

                  try {

                        const user = await usersRepository.createResetToken(mockUsers.mockUserEmailWrong);

                        AssertUtilsRepository.invalidRepository(user);

                  } catch (error) {

                        AssertUtilsRepository.handleDTOError(error, ["Se requiere un email valido"]);
                  }

            });

            // Se define el test para createResetToken
            it('Debería producir un DTO válido, un DAO válido y un Repository válido para createResetToken con un usuario válido', async function () {

                  const userAdded = await usersRepository.addOne(mockUsers.mockRegisterUser);

                  const user = await usersRepository.createResetToken(userAdded);

                  AssertUtilsDTO.validDTO(user);
                  AssertUtilsDAO.validDAO(user);

            });

      });

      // Se describe el grupo de pruebas de resetPassword

});