import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection: AngularFirestoreCollection<User> = this.firestore.collection('User');

  constructor(private firestore: AngularFirestore) { }

  createNewUser(user: User, password: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().createUserWithEmailAndPassword(user.email, password).then(
          () => {
            this.userCollection.add(user)
              .then(res => resolve(res)
                , err => reject(err));
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  updateUser(userId: string, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userCollection.doc(userId).update(user).then(() => resolve(), (err) => reject(err));
    });
  }

  signInUser(email: string, password: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser(): void {
    firebase.default.auth().signOut();
  }

  getCurrentUser(): any {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        return user;
      } else {
        // No user is signed in.
      }
    });
  }

  getUserIdByEmail(email: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.userCollection.ref.where('email', '==', email).get().then(res => {
          if (!res.empty) {
            resolve(res.docs[0].id);
          } else {
            reject('User not exist');
          }
        });
      }
    );
  }

  getUserById(id: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.userCollection.doc(id).get().subscribe(res => {
          if (res.exists) {
            resolve(res.data());
          } else {
            reject('User not exist');
          }
        });
      }
    );
  }

  private resetPassword(newPassword): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().currentUser.updatePassword(newPassword).then(() => resolve, (error) => reject(error));
      });
  }
}
