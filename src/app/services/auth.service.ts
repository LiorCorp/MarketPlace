import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user.model';
import { ErroAuthFr } from '../utils/errorAuthFr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  createUserWithEmailAndPassword(user: User, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(user.email, password)
        .then(
          (newUser) => {
            resolve(newUser);
          },
          (err) => {
            reject(ErroAuthFr.convertMessage(err));
          }
        );
    });
  }

  signInUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.code === 'auth/too-many-requests') {
              reject(err.code);
            } else {
              reject(ErroAuthFr.convertMessage(err));
            }
          }
        );
    });
  }

  updateProfile(firstname: string, photoURL?: string): void {
    this.getCurrentUser().updateProfile({ displayName: firstname, photoURL });
  }

  signOutUser(): void {
    firebase.default.auth().signOut();
  }

  getCurrentUser(): firebase.default.User | null {
    return firebase.default.auth().currentUser;
  }

  resetPassword(newPassword): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .currentUser.updatePassword(newPassword)
        .then(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }
}
