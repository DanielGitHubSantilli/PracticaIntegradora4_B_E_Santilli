import express from 'express';
import {
    addLogger as loggerMiddleware
} from '../../middlewares/logger.middleware.js';

const loggerRouter = express.Router();

loggerRouter.get('/', loggerMiddleware, (req, res) => {

    const logTypes = ['fatal', 'error', 'warning', 'info', 'http', 'debug'];
    const logMessage = {
        message: 'Testing log',
        date: new Date().toLocaleDateString(),
        method: req.method,
        url: req.originalUrl
    };

    logTypes.forEach(type => {
        req.logger[type](logMessage);
    });

    res.send('Logs sent');

});

export default loggerRouter;