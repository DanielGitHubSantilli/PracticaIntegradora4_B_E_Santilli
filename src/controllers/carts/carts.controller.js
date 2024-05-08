import {
    successResponse
} from '../../utils/responses/responses.utils.js';
import {
    getRepositories
} from '../../models/repositories/index.repository.js';

import {
    verifyJWT
} from '../../utils/JWT/jwt.utils.js';

const {
    cartsRepository
} = getRepositories();

export class CartsController {

    static async getAll(req, res, next) {

        try {

            const carts = await cartsRepository.getAll();
            res.send(successResponse(carts));

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

        };

    };

    static async getOne(req, res, next) {

        try {

            const {
                code
            } = req.params;

            const cart = await cartsRepository.getOne(
                code
            );

            res.send(successResponse(cart));

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

        };

    };

    static async saveOne(req, res, next) {

        try {

            const user = req.body.userId;
            const result = await cartsRepository.saveOne(user);
            res.send(successResponse(result));

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

        };

    };

    static async addProduct(req, res, next) {

        try {

            const {
                code,
                productId,
                quantity
            } = req.body;

            const token = req.cookies.auth;

            const userPayload = verifyJWT(token);

            const user = userPayload.payload;

            const result = await cartsRepository.addProduct(code, productId, quantity, user);

            res.send(successResponse(result));

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

        };

    };

    static async deleteCart(req, res, next) {

        try {
            const {
                code,
                productId
            } = req.body;

            const result = await cartsRepository.deleteCart(code, productId);

            res.send(successResponse(result));

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

        };

    };

    // FALTA IMPLEMENTAR

    static async deleteProduct(req, res, next) {

        try {
            const {
                code,
                productId
            } = req.body;

            const result = await cartsRepository.deleteProduct(code, productId);

            res.send(successResponse(result));

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

        };

    };

    // FALTA IMPLEMENTAR

    static async purchaseCart(req, res, next) {

        try {

            const {
                code
            } = req.params;

            const result = await cartsRepository.purchaseCart(code);

            res.send(successResponse(result));

        } catch (error) {

            let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

            req.logger.error({
                message: error.message,
                method: req.method,
                url: req.originalUrl,
                date: new Date().toLocaleDateString(),
                At: errorAt
            });

        };

    };

};