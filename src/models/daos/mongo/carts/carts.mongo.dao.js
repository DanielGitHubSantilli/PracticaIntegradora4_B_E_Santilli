import {
    MongoManager
} from "../../../manager/mongo/mongo.manager.js";
import cartsModel from "../../../schemas/carts.schema.js";

export class CartsMongoDAO {

    constructor() {

        MongoManager.start();

    };

    async getAll() {

        return await cartsModel.find().lean();

    }

    async getOne(payload) {

        if (payload.code) {

            return await cartsModel.findOne({
                code: payload.code
            }).lean();

        }

    };

    async saveOne(cart) {

        return await cartsModel.create(cart);

    };

    async deleteCart(cart) {

        return await cartsModel.findOneAndDelete({
            code: cart.code
        });

    }

    async addProduct(code, payload) {

        const cart = await cartsModel.findOneAndUpdate({
            code: code
        }, payload, {
            new: true
        });

        return cart;

    }

    // FALTA IMPLEMENTAR

    async deleteProduct(payload) {

        return await cartsModel.findOneAndDelete({
            code: payload.code
        });

    };

    // FALTA IMPLEMENTAR

};