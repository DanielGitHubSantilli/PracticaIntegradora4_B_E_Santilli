import winston from 'winston';
import CONFIG from '../config/environment/config.js';

const customLevels = {
      levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            http: 4,
            debug: 5
      },
      colors: {
            fatal: 'black',
            error: 'red',
            warning: 'yellow',
            info: 'magenta',
            http: 'green',
            debug: 'white'
      }
}

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
      levels: customLevels.levels,
      format: winston.format.combine(
            winston.format.simple()
      ),
      transports: [
            new winston.transports.Console({
                  format: winston.format.combine(
                        winston.format.colorize({
                              all: true
                        }),
                        winston.format.simple()
                  )
            }),
            new winston.transports.File({
                  filename: './logs/errors.log',
                  level: 'error',
            }),
            new winston.transports.File({
                  filename: './logs/fatals.log',
                  level: 'fatal',
            })
      ]
});


if (CONFIG.ENV === 'dev') {
      logger.level = 'info';
} else {
      logger.level = 'debug';
}

export const addLogger = (req, res, next) => {
      const HOST = req.rawHeaders[1];
      const URL = `http://${HOST}${req.originalUrl}`;
      const logTypes = ['fatal', 'error', 'warning', 'info', 'http', 'debug'];
      const logMessages = {
            fatal: 'Error fatal en peticion.',
            error: 'Error en peticion.',
            warning: 'Alerta de petición.',
            info: 'Información de petición.',
            http: 'Peticion HTTP.',
            debug: 'Debug de petición.'
      };

      req.logger = logger;
      req.logMessage = (type) => {
            if (logTypes.includes(type)) {
                  req.logger[type]({
                        method: req.method,
                        url: URL,
                        message: logMessages[type],
                        date: new Date().toLocaleDateString()
                  });
            }
      };

      next();
}