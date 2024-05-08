import mongoose from 'mongoose';

import CONFIG from '../../../config/environment/config.js';

export class MongoManager {

      static #instance;

      constructor() {

            const MONGO_URL = CONFIG.MONGO_URL;

            mongoose.set('strictQuery', false);

            mongoose.connect(MONGO_URL, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            }).then(() => {
                  console.log('Base de datos conectada');
            }).catch((error) => {
                  console.log(error);
            });

      };

      static start() {

            if (!this.#instance) {

                  this.#instance = new MongoManager();

            } else {

                  return console.log('La base de datos ya está conectada');

            };

      };

};