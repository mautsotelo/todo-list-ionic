import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  public async createTask(key: string, value: any) {
    await this.storage.set(key, value);
  }

  public async editTask(key: string, value: any) {
    await this.storage.set(key, value);
  }

  public async getAll() {
    return this.storage.keys()
      .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  }

  public async getTaskByID(id: string) {
    return await this.storage.get(id);
  }

  public async deleteTaskByID(id: string) {
    return await this.storage.remove(id);
  }
}
