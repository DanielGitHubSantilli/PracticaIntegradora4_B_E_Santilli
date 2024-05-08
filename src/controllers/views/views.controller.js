import {
    getRepositories
} from '../../models/repositories/index.repository.js';

import {
    verifyJWT
} from '../../utils/JWT/jwt.utils.js';

const {
    productsRepository
} = getRepositories();


export class ViewsController {

    static async login(req, res, next) {

        res.render('login');

    };

    static async register(req, res, next) {

        res.render('register');

    };

    static async resetPasswordRequest(req, res, next) {

        res.render('resetPasswordRequest');

    }

    static async resetPassword(req, res, next) {

        const token = req.query.token;
        const createdAt = new Date(req.query.createdAt);
        const now = new Date();

        if (now - createdAt > 60 * 1000) {
            res.redirect('/resetPasswordRequest');
            return;
        }

        res.render('resetPassword', {
            token
        });

    };

    static async profile(req, res, next) {

        const token = req.cookies.auth;

        if (!token) {

            return res.redirect('/login');

        };

        const decoded = verifyJWT(token);

        const user = decoded.payload;

        res.render('profile', {
            userName: user.first_name,
            userLastName: user.last_name,
            userAge: user.age,
            userRole: user.role,
            userPhone: user.phone ? user.phone : "Teléfono",
        });

    };

    static async products(req, res, next) {

        try {

            const {
                page,
                limit,
                sort,
                query
            } = req.query;

            const productsData = await productsRepository.getAll({
                page,
                limit,
                sort,
                query
            });

            productsData.payload.products = productsData.payload.products.map((product) => {

                return {
                    ...JSON.parse(JSON.stringify(product)),
                };

            });

            res.render('products', {

                products: productsData.payload.products,
                hasPrevPage: productsData.hasPrevPage,
                hasNextPage: productsData.hasNextPage,
                prevPage: productsData.prevPage,
                nextPage: productsData.nextPage,

            });

        } catch (error) {

            next(error);
        };

    };

};