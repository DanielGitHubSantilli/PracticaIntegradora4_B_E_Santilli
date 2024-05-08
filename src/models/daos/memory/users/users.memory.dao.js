import { MemoryManager } from "../../../manager/memory/memory.manager.js";

export class UsersMemoryDAO {

  constructor() {
    this.memoryManager = MemoryManager.start();
  }

  getAdmin() {
    return this.memoryManager.admin;
  }

};