import {
      AssertUtilsDTO
} from '../../../utils/asserts.utils.js';
import {
      getDTOS
} from '../../../../src/models/dtos/index.dtos.js';
import {
      mockUsers
} from '../../../utils/mocks.utils.js';

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

// Sección de pruebas
describe('User DTOs Tests', () => {

      // Se describe el grupo de pruebas de GetUserDTO
      describe(`\n GetUserDTO Tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para GetUserDTO, con un email válido', () => {

                  // Given
                  const dto = new GetUserDTO({
                        email: 'test@gmail.com',
                        password: 'testpassword'
                  });

                  // Then
                  AssertUtilsDTO.validEqualsDTO(dto, ['email', 'password'], ['test@gmail.com', 'testpassword']);

                  AssertUtilsDTO.validDTO(dto);

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para GetUserDTO, con un email inválido', () => {

                  // Given
                  const dto = new GetUserDTO({
                        email: 'test@invalid.com'
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Se requiere un email valido');

            });

      });

      // Se describe el grupo de pruebas de LoadUserDTO
      describe(`\n LoadUserDTO Tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para LoadUserDTO, debido a un usuario ingresado válido y un usuario válido de la base de datos', () => {

                  // Given
                  const dto = new LoadUserDTO({
                        ...mockUsers.mockUser
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email', '_id'], [mockUsers.mockUser.email, mockUsers.mockUserDB._id]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para LoadUserDTO, debido a una contraseña incorrecta', () => {

                  // Given
                  const dto = new LoadUserDTO({
                        ...mockUsers.mockUserPassWrong
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Contraseña incorrecta')

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para LoadUserDTO, debido a no tener un usuario de la base de datos', () => {

                  // Given
                  const dto = new LoadUserDTO({
                        ...mockUsers.mockUser
                  }, null);

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'El usuario que se intenta cargar, no existe');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para LoadUserDTO, debido a un email inválido', () => {

                  // Given
                  const dto = new LoadUserDTO({
                        ...mockUsers.mockUserEmailWrong
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Se requiere un email valido');

            });

      });

      // Se describe el grupo de pruebas de SaveUserDTO
      describe(`\n SaveUserDTO Tests \n `, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para SaveUserDTO, debido a un usuario válido', () => {

                  // Given
                  const dto = new SaveUserDTO({
                        ...mockUsers.mockRegisterUser
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email'], [mockUsers.mockRegisterUser.email]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO válido para SaveUserDTO con el password hasheado, debido a un usuario válido', () => {

                  // Given
                  const dto = new SaveUserDTO({
                        ...mockUsers.mockRegisterUser
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validNotEqualsDTO(dto, ['password'], [mockUsers.mockRegisterUser.password]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO válido para SaveUserDTO, debido a un usuario válido con rol premium', () => {

                  // Given
                  const dto = new SaveUserDTO({
                        ...mockUsers.mockPremiumUser
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email', 'role'], [mockUsers.mockPremiumUser.email, 'PREMIUM']);

            });

            // Descripción de la prueba
            it('Debería producir un DTO valido para SaveUserDTO con telefono, debido a un usuario válido', () => {

                  // Given
                  const dto = new SaveUserDTO({
                        ...mockUsers.mockUpdatedUser
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email', 'phone'], [mockUsers.mockUpdatedUser.email, mockUsers.mockUpdatedUser.phone]);

            });


            // Descripción de la prueba
            it('Debería producir un DTO inválido para SaveUserDTO, debido a una contraseña inválida', () => {

                  // Given
                  const dto = new SaveUserDTO({
                        ...mockUsers.mockRegisterUser,
                        password: '123456'
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'La contraseña debe tener al menos 8 caracteres');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para SaveUserDTO, debido a que las contraseñas no coinciden', () => {

                  // Given
                  const dto = new SaveUserDTO({
                        ...mockUsers.mockUser
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Las contraseñas no coinciden');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para SaveUserDTO, debido a un email inválido', () => {

                  // Given
                  const dto = new SaveUserDTO({
                        ...mockUsers.mockUserEmailWrong
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Se requiere un email valido');

            });


      });

      // Se describe el grupo de pruebas de UpdateUserDTO
      describe(`\n UpdateUserDTO Tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para UpdateUserDTO, debido a un usuario ingresado válido y un usuario válido de la base de datos', () => {

                  // Given
                  const dto = new UpdateUserDTO({
                        ...mockUsers.mockUpdatedUser
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email', 'first_name'], [mockUsers.mockUpdatedUser.email, mockUsers.mockUpdatedUser.first_name]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO válido para UpdateUserDTO con rol Premium, debido a un usuario ingresado válido y un usuario válido de la base de datos', () => {

                  // Given
                  const dto = new UpdateUserDTO({
                        ...mockUsers.mockPremiumUser
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email', 'role'], [mockUsers.mockPremiumUser.email, 'PREMIUM']);

            });

            // Descripción de la prueba
            it('debería producir un DTO válido para UpdateUserDTO con igual _id, debido a un usuario ingresado válido y un usuario válido de la base de datos', () => {

                  // Given
                  const dto = new UpdateUserDTO({
                        ...mockUsers.mockUpdatedUser
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['_id'], [mockUsers.mockUserDB._id]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para UpdateUserDTO, debido a que las contraseñas no coinciden', () => {

                  // Given
                  const dto = new UpdateUserDTO({
                        ...mockUsers.mockUserConfirmPassWrong
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Las contraseñas no coinciden');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para UpdateUserDTO, debido a un email inválido', () => {

                  // Given
                  const dto = new UpdateUserDTO({
                        ...mockUsers.mockUserEmailWrong
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Se requiere un email valido');

            });

      });

      // Se describe el grupo de pruebas de DeleteUserDTO
      describe(`\n DeleteUserDTO Tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para DeleteUserDTO, debido a un usuario válido', () => {

                  // Given
                  const dto = new DeleteUserDTO({
                        ...mockUsers.mockRegisterUser
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email'], [mockUsers.mockRegisterUser.email]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para DeleteUserDTO, debido a un usuario vacio', () => {

                  // Given
                  const dto = new DeleteUserDTO(null, {
                        ...mockUsers.mockUserDB
                  });

                  const dto2 = new DeleteUserDTO({
                        ...mockUsers.mockRegisterUser
                  }, null);

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'El usuario que se intenta eliminar, no existe');

                  AssertUtilsDTO.invalidDTO(dto2, 'El usuario que se intenta eliminar, no existe');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para DeleteUserDTO, debido a un email inválido', () => {

                  // Given
                  const dto = new DeleteUserDTO({
                        ...mockUsers.mockUserEmailWrong
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Se requiere un email valido');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para DeleteUserDTO, debido a una contraseña incorrecta', () => {

                  // Given
                  const dto = new DeleteUserDTO({
                        ...mockUsers.mockUserPassWrong
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Contraseña incorrecta');

            });

      });

      // Se describe el grupo de pruebas de LoadAdminDTO
      describe(`\n LoadAdminDTO Tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para LoadAdminDTO, debido a un usuario ingresado válido y un usuario válido de las variables de entorno', () => {

                  // Given
                  const dto = new LoadAdminDTO({
                        ...mockUsers.mockLoginAdminUser
                  }, {
                        ...mockUsers.mockAdminUser
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email'], [mockUsers.mockLoginAdminUser.email]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para LoadAdminDTO, debido a un usuario ingresado válido y un usuario vacío de las variables de entorno', () => {

                  // Given
                  const dto = new LoadAdminDTO({
                        ...mockUsers.mockLoginAdminUser
                  }, null);

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'El usuario que se intenta cargar, no existe');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para LoadAdminDTO, debido a un usuario ingresado inválido y un usuario válido de las variables de entorno', () => {

                  // Given
                  const dto = new LoadAdminDTO({
                        ...mockUsers.mockWrongAdminUser
                  }, {
                        ...mockUsers.mockAdminUser
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'El usuario que se intenta cargar, no existe');

            });

      });

      // Se describe el grupo de pruebas de CreateResetTokenDTO
      describe(`\n CreateResetTokenDTO Tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para CreateResetTokenDTO con el token y la fecha de expiración, debido a un usuario válido de la base de datos', () => {

                  // Given
                  const dto = new CreateResetTokenDTO({
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email'], [mockUsers.mockUserDB.email]);

                  AssertUtilsDTO.validTypeDTO(dto, ['password_reset_token', 'password_reset_expires'], ['string', 'date']);

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para CreateResetTokenDTO, debido a un usuario vacío de la base de datos', () => {

                  // Given
                  const dto = new CreateResetTokenDTO(null);

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'El usuario que se intenta cargar, no existe');

            });


      });

      // Se describe el grupo de pruebas de ResetPasswordDTO
      describe(`\n ResetPasswordDTO Tests \n`, () => {

            // Descripción de la prueba
            it('Debería producir un DTO válido para ResetPasswordDTO, debido a un usuario ingresado válido y un usuario válido de la base de datos', () => {

                  // Given
                  const dto = new ResetPasswordDTO({
                        ...mockUsers.mockUpdatedUser,
                        password: 'testpassword2',
                        confirm_password: 'testpassword2'
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.validDTO(dto);

                  AssertUtilsDTO.validEqualsDTO(dto, ['email'], [mockUsers.mockUpdatedUser.email]);

                  AssertUtilsDTO.validNotEqualsDTO(dto, ['password'], [mockUsers.mockUserDB.password]);

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para ResetPasswordDTO, debido a un usuario ingresado válido y un usuario vacío de la base de datos', () => {

                  // Given
                  const dto = new ResetPasswordDTO({
                        ...mockUsers.mockUpdatedUser
                  }, null);

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'El usuario que se intenta cargar, no existe');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para ResetPasswordDTO, debido a un email inválido', () => {

                  // Given
                  const dto = new ResetPasswordDTO({
                        ...mockUsers.mockUserEmailWrong,
                        password: 'testpassword2',
                        confirm_password: 'testpassword2'
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Se requiere un email valido');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para ResetPasswordDTO, debido a una contraseña inválida', () => {

                  // Given
                  const dto = new ResetPasswordDTO({
                        ...mockUsers.mockUserPassWrong,
                        password: '123456',
                        confirm_password: '123456'
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'La contraseña debe tener al menos 8 caracteres');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para ResetPasswordDTO, debido a una confirmación de contraseña inválida', () => {

                  // Given
                  const dto = new ResetPasswordDTO({
                        ...mockUsers.mockUserPassWrong,
                        password: 'testpassword'
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'Las contraseñas no coinciden');

            });

            // Descripción de la prueba
            it('Debería producir un DTO inválido para ResetPasswordDTO, debido a una contraseña ingresada igual a la anterior', () => {

                  // Given
                  const dto = new ResetPasswordDTO({
                        ...mockUsers.mockUpdatedUser,
                        password: 'testpassword',
                        confirm_password: 'testpassword'
                  }, {
                        ...mockUsers.mockUserDB
                  });

                  // Then
                  AssertUtilsDTO.invalidDTO(dto, 'La contraseña debe ser diferente a la anterior');

            });

      });


});