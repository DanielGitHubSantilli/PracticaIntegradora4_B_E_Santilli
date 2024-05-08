import {
    errorResponse,
    HTTP_STATUS
} from "../utils/responses/responses.utils.js";

import {
    verifyJWT
} from "../utils/JWT/jwt.utils.js";

export const authFromHeader = (req, res, next) => {

    try {

        const headerAuth = req.headers.authorization;

        if (!headerAuth) {

            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No se ha enviado el token de autenticación'));

        };

        const token = headerAuth.split(' ')[1];

        const decoded = verifyJWT(token);

        req.user = decoded.payload;

        next();

    } catch (error) {

        throw error;

    };

};

export const authFromCookie = (req, res, next) => {

    try {

        const cookieAuth = req.cookies.auth;

        if (!cookieAuth) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No se ha enviado el token de autenticación'));
        };

        const token = cookieAuth;

        const decoded = verifyJWT(token);

        req.user = decoded.payload;

        next();

    } catch (error) {

        throw error;

    };

};

export const authAdmin = (req, res, next) => {

    try {

        const cookieAuth = req.cookies.auth;

        if (!cookieAuth) {

            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No se ha enviado el token de autenticación'));

        };

        const token = cookieAuth;

        const decoded = verifyJWT(token);

        if (decoded.payload.role !== 'ADMIN') {

            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No está autorizado para acceder a este recurso'));

        };

        req.user = decoded.payload;

        next();

    } catch (error) {

        throw error;

    };

};

export const authPremium = (req, res, next) => {

    try {

        const cookieAuth = req.cookies.auth;

        if (!cookieAuth) {

            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No se ha enviado el token de autenticación'));

        };

        const token = cookieAuth;

        const decoded = verifyJWT(token);

        if (decoded.payload.role !== 'ADMIN' && decoded.payload.role !== 'PREMIUM') {

            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No está autorizado para acceder a este recurso'));

        };

        req.user = decoded.payload;

        next();

    } catch (error) {

        throw error;

    };

};

export const authUser = (req, res, next) => {

    try {

        const cookieAuth = req.cookies.auth;

        if (!cookieAuth) {

            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No se ha enviado el token de autenticación'));

        };

        const token = cookieAuth;

        const decoded = verifyJWT(token);

        const role = decoded.payload.role;

        if (role === 'ADMIN') {

            return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No está autorizado para acceder a este recurso'));

        };

        req.user = decoded.payload;

        next();

    } catch (error) {

        throw error;

    };

};