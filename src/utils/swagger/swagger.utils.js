import CONFIG from "../../config/environment/config.js"
import __dirname from "../../__dirname.js"

export const swaggerOptions = {
      definition: {
            openapi: '3.0.0',
            info: {
                  title: 'Documentación de la API',
                  version: '0.9.0',
                  description: `Documentación sobre el manejo de productos, carritos y usuarios. \n
Contacto:`,
                  contact: {
                        name: 'Valentín Alvarez',
                        url: 'https://www.linkedin.com/in/valentin-alvarez-bianchi/',
                        email: `${CONFIG.MAIL_HOST}`
                  }
            },
            components: {
                  securitySchemes: {
                        CookieAuth: {
                              type: 'apiKey',
                              in: 'cookie',
                              name: 'auth'
                        }
                  }
            }
      },
      apis: [`${__dirname}/docs/**/*.yaml`]
}