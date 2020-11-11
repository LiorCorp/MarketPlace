import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly userService: UserService) { }

  createNewUser(user: User, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(user.email, password)
        .then(
          (authUser) => {
            const newUser: User = { ...user, uid: authUser.user.uid };
            this.userService.createUser(newUser);
            resolve('Success');
          },
          (error) => {
            reject(error);
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
            this.userService.getUserByUid(res.user.uid);
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
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
