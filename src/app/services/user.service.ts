import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { ErroAuthFr } from '../utils/errorAuthFr';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: AngularFirestoreCollection<User> = this.firestore.collection(
    'User'
  );

  constructor(private firestore: AngularFirestore) {}

  async createUser(user: User): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.userCollection.add(user).then(
        (res) => {
          res.get().then((docRef) => resolve(docRef.id));
        },
        (err) => reject(ErroAuthFr.convertMessage(err))
      );
    });
  }

  async updateUser(userId: string, user: User): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.userCollection
        .doc(userId)
        .update(user)
        .then(
          (res) => resolve(res),
          (err) => reject(ErroAuthFr.convertMessage(err))
        );
    });
  }

  async userExist(email: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.userCollection.ref
        .where('email', '==', email)
        .get()
        .then(
          (res) => {
            if (!res.empty) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (err) => reject(ErroAuthFr.convertMessage(err))
        );
    });
  }
}
