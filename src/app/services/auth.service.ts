import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user.model';
import { ErroAuthFr } from '../utils/errorAuthFr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firestore: AngularFirestore,
    public fireAuth: AngularFireAuth
  ) {}

  private authStatusSub = new BehaviorSubject(
    this.firestore.firestore.app.auth().currentUser
  );
  currentAuthStatus = this.authStatusSub.asObservable();

  get isLoggedIn(): Promise<boolean> {
    return this.getCurrentUser().then(
      (user) => user !== null && user.emailVerified !== false
    );
  }

  authStatusListener(): void {
    this.fireAuth.onAuthStateChanged((credential) => {
      if (credential) {
        this.authStatusSub.next(credential);
      } else {
        this.authStatusSub.next(null);
      }
    });
  }

  async getCurrentUser(): Promise<firebase.default.User> {
    return await this.fireAuth.currentUser.then((user) => user);
  }

  async createUserWithEmailAndPassword(
    user: User,
    password: string
  ): Promise<firebase.default.auth.UserCredential> {
    return await new Promise((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(user.email, password).then(
        (newUser: firebase.default.auth.UserCredential) => {
          if (newUser !== null) {
            this.sendEmailVerification().then(() => resolve(newUser));
          }
        },
        (err) => {
          reject(ErroAuthFr.convertMessage(err));
        }
      );
    });
  }

  async loginWithGoogle(): Promise<firebase.default.auth.UserCredential> {
    return await new Promise((resolve, reject) => {
      this.fireAuth
        .signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
        .then(
          (res: firebase.default.auth.UserCredential) => {
            resolve(res);
          },
          (err) => {
            reject(ErroAuthFr.convertMessage(err));
          }
        );
    });
  }

  async loginWithFacebook(): Promise<firebase.default.auth.UserCredential> {
    return await new Promise((resolve, reject) => {
      this.fireAuth
        .signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
        .then(
          (res: firebase.default.auth.UserCredential) => {
            resolve(res);
          },
          (err) => {
            reject(ErroAuthFr.convertMessage(err));
          }
        );
    });
  }

  async signInUser(
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> {
    return await new Promise((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then(
        (res: firebase.default.auth.UserCredential) => {
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

  async sendEmailVerification(): Promise<void> {
    return await this.getCurrentUser().then((user) => {
      user.sendEmailVerification();
    });
  }

  async emailIsVerified(): Promise<boolean> {
    return await this.getCurrentUser().then((user) => user.emailVerified);
  }

  async resetPassword(email: string): Promise<void> {
    return await this.firestore.firestore.app
      .auth()
      .sendPasswordResetEmail(email);
  }

  updateProfile(firstname: string, photoURL?: string): void {
    this.getCurrentUser().then((user) =>
      user.updateProfile({ displayName: firstname, photoURL })
    );
  }

  signOutUser(): void {
    this.firestore.firestore.app.auth().signOut();
  }
}
