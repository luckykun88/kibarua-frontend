import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private db: AngularFireDatabase) { }

  getSpecificUser(key) {
    return this.db.object(`users/${key}`).valueChanges();
  }

  updateWorker(data, key) {
    this.db.object(`users/${key}`).update({
     fullName: data.fullName,
     role: data.role
    });
  }

}
