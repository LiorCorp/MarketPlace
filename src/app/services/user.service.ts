import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: AngularFirestoreCollection<User> = this.firestore.collection(
    'User'
  );

  constructor(private firestore: AngularFirestore) {}

  createUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userCollection.add(user).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      );
      resolve();
    });
  }

  updateUser(userId: string, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userCollection
        .doc(userId)
        .update(user)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  getUserByUid(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userCollection.ref
        .where('uid', '==', uid)
        .get()
        .then(
          (res) => {
            if (!res.empty) {
              resolve(res.docs[0].data());
            }
          },
          (err) => reject(err)
        );
    });
  }
}
