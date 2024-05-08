import {
    MongoManager
} from "../../../manager/mongo/mongo.manager.js";
import productsModel from "../../../schemas/products.schema.js";

export class ProductsMongoDAO {

    constructor() {

        MongoManager.start();

    };

    async getAll({
        limit = 10,
        page = 1,
        sort,
        query
    }) {

        try {

            const options = {
                page: page,
                limit: limit
            };

            const searchQuery = {};

            if (query) {

                searchQuery.$or = [{
                    title: {
                        $regex: query,
                        $options: "i"
                    }
                }, {
                    category: {
                        $regex: query,
                        $options: "i"
                    }
                }, {
                    code: {
                        $regex: query,
                        $options: "i"
                    }
                }];

            }

            if (sort === "asc") {
                options.sort = {
                    price: 1
                };
            } else if (sort === "desc") {
                options.sort = {
                    price: -1
                };
            }

            const products = await productsModel.paginate(searchQuery, options);

            return {
                status: "success",
                payload: {
                    products: products.docs,
                },
                totalPages: products.totalPages,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.hasPrevPage ? products.prevPage : null,
                nextPage: products.hasNextPage ? products.nextPage : null,
            };

        } catch (error) {

            throw new Error(error);

        }

    };

    async getById(id) {

        return await productsModel.findOne({
            id
        }).lean();

    }

    async saveProduct(product) {

        return await productsModel.create(product);

    }

    async updateById(id, product) {

        return await productsModel.updateOne({
            id
        }, product);

    };

    async deleteById(id) {

        return await productsModel.deleteOne({
            id
        });

    }

};