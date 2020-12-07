import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user.model';
import { ErroAuthFr } from '../utils/errorAuthFr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private authStatusSub = new BehaviorSubject(this.getCurrentUser());
  currentAuthStatus = this.authStatusSub.asObservable();

  getCurrentUser(): firebase.default.User | null {
    return firebase.default.auth().currentUser;
  }

  authStatusListener(): void {
    firebase.default.auth().onAuthStateChanged((credential) => {
      if (credential) {
        this.authStatusSub.next(credential);
      } else {
        this.authStatusSub.next(null);
      }
    });
  }

  async createUserWithEmailAndPassword(
    user: User,
    password: string
  ): Promise<any> {
    return await new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(user.email, password)
        .then(
          (newUser) => {
            if (newUser !== null) {
              this.sendEmailVerification();
              resolve(newUser);
            }
          },
          (err) => {
            reject(ErroAuthFr.convertMessage(err));
          }
        );
    });
  }

  async loginWithGoogle(): Promise<any> {
    return await new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(ErroAuthFr.convertMessage(err));
          }
        );
    });
  }

  async signInUser(email: string, password: string): Promise<any> {
    return await new Promise((resolve, reject) => {
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

  sendEmailVerification(): void {
    this.getCurrentUser()
      .sendEmailVerification()
      .then(() => {
        // Verification email sent.
      })
      .catch((error) => {
        console.log(error);
        // Error occurred. Inspect error.code.
      });
  }

  emailIsVerified(): boolean {
    return this.getCurrentUser().emailVerified;
  }

  activeAccount(): void {
    this.getCurrentUser().emailVerified = true;
  }

  updateProfile(firstname: string, photoURL?: string): void {
    this.getCurrentUser().updateProfile({ displayName: firstname, photoURL });
  }

  signOutUser(): void {
    firebase.default.auth().signOut();
  }

  async resetPassword(newPassword: string): Promise<any> {
    return await new Promise((resolve, reject) => {
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
