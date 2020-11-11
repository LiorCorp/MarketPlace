import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      }
    );
  }
}
