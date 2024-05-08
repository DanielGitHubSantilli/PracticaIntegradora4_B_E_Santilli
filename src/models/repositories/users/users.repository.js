import {
      getDAOS
} from "../../daos/index.daos.js";

import {
      getDTOS
} from "../../dtos/index.dtos.js";

const {
      GetAllDTO,
      SaveUserDTO,
      LoadUserDTO,
      GetUserDTO,
      UpdateDocumentsDTO,
      UpdateRolePremiumDTO,
      UpdateRoleUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
      CreateResetTokenDTO,
      ResetPasswordDTO
} = getDTOS();

const {
      usersMongoDAO,
      usersMemoryDAO
} = getDAOS();

export class UsersRepository {

      constructor() {

            this.dao = usersMongoDAO;
            this.dao.memory = usersMemoryDAO;

      };

      async getAll() {

            const usersPayload = await this.dao.getAll();

            const users = new GetAllDTO(usersPayload);

            if (users.errors) throw new Error(JSON.stringify(users.errors));

            return users;

      }

      async getOne(payload) {

            const userPayload = new GetUserDTO(payload);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const user = await this.dao.getOne(userPayload);

            return user;

      };

      async loginOne(payload, user) {

            const userPayload = new LoadUserDTO(payload, user);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            return userPayload;

      };

      async addOne(payload) {

            const userPayload = new SaveUserDTO(payload);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const user = await this.dao.addOne(userPayload);

            return user;

      };

      async uploadDocuments(_id, files) {

            const user = await this.dao.getOne({
                  _id: _id,
            });

            if (!user) throw new Error('No se ha encontrado el usuario');

            const userWithDocuments = new UpdateDocumentsDTO(user, files);

            if (userWithDocuments.errors) throw new Error(JSON.stringify(userWithDocuments.errors));

            const result = await this.dao.updateOne(userWithDocuments);

            return result ? userWithDocuments : result;

      };

      async updateRole(payload) {

            const user = await this.dao.getOne({
                  email: payload.email.toLowerCase(),
                  _id: payload._id
            });

            if (!user) throw new Error('No se ha encontrado el usuario');

            if (user.role === 'ADMIN') throw new Error('No puedes cambiar el rol de un administrador');

            if (user.role === 'PREMIUM') {

                  const updatedRole = new UpdateRoleUserDTO(user);

                  const updatedUser = {
                        ...user,
                        role: updatedRole.role
                  }

                  if (updatedRole.errors) throw new Error(JSON.stringify(updatedRole.errors));

                  const result = await this.dao.updateOne(updatedUser);

                  return result ? updatedUser : result;

            }

            const updatedRole = new UpdateRolePremiumDTO(user);

            const updatedUser = {
                  ...user,
                  role: updatedRole.role
            }

            if (updatedRole.errors) throw new Error(JSON.stringify(updatedRole.errors));

            const result = await this.dao.updateOne(updatedUser);

            return result ? updatedUser : result;

      };

      async updateOne(oldUser, newUser) {

            const updatedPayload = new UpdateUserDTO(newUser, oldUser);

            if (updatedPayload.errors) throw new Error(JSON.stringify(updatedPayload.errors));

            return await this.dao.updateOne(updatedPayload);

      };

      async deleteOne(payload) {

            const userToDelete = await this.dao.getOne(payload);

            const payloadToDelete = new DeleteUserDTO(payload, userToDelete);

            return await this.dao.deleteOne(payloadToDelete, payloadToDelete.email);

      };

      async loginAdmin(payload) {

            const admin = await this.dao.memory.getAdmin();

            const userPayload = new LoadAdminDTO(payload, admin);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            return userPayload;

      };

      async createResetToken(payload) {

            const userPayload = new GetUserDTO(payload.email);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const user = await this.dao.getOne(userPayload);

            const userToUpdate = new CreateResetTokenDTO(user);

            if (userToUpdate.errors) throw new Error(JSON.stringify(userToUpdate.errors));

            return await this.dao.updateOne(userToUpdate);

      };

      async resetPassword(payload) {

            const userPayload = new GetUserDTO(payload.email);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const userToUpdate = await this.dao.getOne(userPayload);

            const updatedUser = new ResetPasswordDTO(payload, userToUpdate);

            if (updatedUser.errors) throw new Error(JSON.stringify(updatedUser.errors));

            return await this.dao.updateOne(updatedUser);

      };

}