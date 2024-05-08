import {
      MongoManager
} from "../../../manager/mongo/mongo.manager.js";
import usersModel from "../../../schemas/users.schema.js";

export class UsersMongoDAO {

      constructor() {

            MongoManager.start();

      };

      async getAll() {

            return await usersModel.find({}).lean();

      };

      async getOne(payload) {

            if (payload.email) {

                  return await usersModel.findOne({
                        email: payload.email
                  }).lean();

            }

            return await usersModel.findOne({
                  _id: payload._id
            }).lean();


      };

      async addOne(payload) {

            return await usersModel.create(payload);

      };

      async updateOne(payload) {

            return await usersModel.findOneAndUpdate({
                  _id: payload._id
            }, payload, {
                  new: true
            });

      };

      async deleteOne(payload, email) {

            return await usersModel.findOneAndDelete(
                  payload.email ? {
                        email: payload.email
                  } : {
                        email: email
                  }
            );

      };

};