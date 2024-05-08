import CONFIG from '../../../config/environment/config.js';

export class MemoryManager {

  static #instance;

  constructor() {

    this.admin = CONFIG.ADMIN;

  };

  static start() {

    if (!this.#instance) {

      this.#instance = new MemoryManager();

    } else {

      console.log('Ya hay una instancia de MemoryManager');

    };

    return this.#instance;

  }

};