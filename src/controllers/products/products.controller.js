import {
    getRepositories
} from '../../models/repositories/index.repository.js';

import {
    verifyJWT
} from '../../utils/JWT/jwt.utils.js';

const {
    productsRepository
} = getRepositories();

export class ProductsController {

    static async getAll(req, res, next) {

        try {

            let {
                limit = 10, page = 1, sort, query
            } = req.query;

            limit = parseInt(limit);
            page = parseInt(page);
            query !== undefined ? query = query.toString() : query = undefined;

            const result = await productsRepository.getAll({
                limit,
                page,
                sort,
                query
            });

            res.send({
                ...result
            });

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n')[1].trim() : undefined;

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

            res.status(500).send({
                status: 'error',
                payload: error.message
            });


        };

    };

    static async getById(req, res, next) {

        try {
            const {
                id
            } = req.params;

            const product = await productsRepository.getById(id);

            res.send({
                status: 'success',
                message: `Producto con id: ${id}, encontrado correctamente en la base de datos`,
                payload: product
            });

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n')[1].trim() : undefined;

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

            res.status(500).send({
                status: 'error',
                payload: error.message
            });

        };

    };

    static async addOne(req, res, next) {

        try {

            const product = req.body;
            const token = req.cookies.auth;

            const user = verifyJWT(token);

            const result = await productsRepository.addOne(product, user);

            res.send({
                status: 'success',
                payload: `Producto con id: ${result.id}, guardado correctamente en la base de datos`
            });

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n')[1].trim() : undefined;

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

            res.status(500).send({
                status: 'error',
                payload: error.message
            });

        };

    };

    static async updateOne(req, res, next) {

        try {

            const {
                id
            } = req.params;

            const product = req.body;
            const token = req.cookies.auth;
            const user = verifyJWT(token);

            const result = await productsRepository.updateOne(id, product, user.payload);

            res.send({
                status: 'success',
                message: `Producto con id: ${id}, actualizado correctamente en la base de datos`,
                payload: result
            });

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n')[1].trim() : undefined;

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

            res.status(500).send({
                status: 'error',
                payload: error.message
            });

        };

    };

    static async deleteOne(req, res, next) {

        try {

            const {
                id
            } = req.params;

            const token = req.cookies.auth;
            const user = verifyJWT(token);

            const result = await productsRepository.deleteOne(id, user.payload);

            res.send({
                status: 'success',
                message: `Producto con id: ${id}, eliminado correctamente de la base de datos`,
                payload: result
            });

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n')[1].trim() : undefined;

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

            res.status(500).send({
                status: 'error',
                payload: error.message
            });

        };

    };

};