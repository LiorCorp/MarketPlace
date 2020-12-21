import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from './../services/user.service';
import { SnackbarComponent } from './../ui/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signinMode = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  resetPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    public readonly dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  changeSignMode(signin: boolean): void {
    this.signinMode = signin;
  }

  async loginWithGoogle(): Promise<void> {
    await this.authService.loginWithGoogle().then(async (res) => {
      const user: User = {
        firstname: res.additionalUserInfo.profile['given_name'],
        lastname: res.additionalUserInfo.profile['family_name'],
        email: res.additionalUserInfo.profile['email'],
      };
      // vérfier si on a déjà ces infos pas besoin de update à chaque fois...
      this.authService.updateProfile(user.firstname);
      await this.userService.userExist(user.email).then((isExist) => {
        if (!isExist) {
          this.createUser({ user, title: 'signin.success.welcome' });
        } else {
          this.openSnackBar({
            title: 'signin.success.welcome',
            description: '',
            panelClass: 'snackbar-success',
            duration: 3000,
            firstname: user.firstname,
          });
        }
      });
      this.dialog.closeAll();
    });
  }

  async loginWithFacebook(): Promise<void> {
    await this.authService.loginWithFacebook().then(async (res) => {
      const user: User = {
        firstname: res.additionalUserInfo.profile['first_name'],
        lastname: res.additionalUserInfo.profile['last_name'],
        email: res.additionalUserInfo.profile['email'],
      };
      // vérfier si on a déjà ces infos pas besoin de update à chaque fois...
      this.authService.updateProfile(user.firstname);
      await this.userService.userExist(user.email).then((isExist) => {
        if (!isExist) {
          this.createUser({ user, title: 'signin.success.welcome' });
        } else {
          this.openSnackBar({
            title: 'signin.success.welcome',
            description: '',
            panelClass: 'snackbar-success',
            duration: 3000,
            firstname: user.firstname,
          });
        }
      });
      this.dialog.closeAll();
    });
  }

  async createUser({ user, title, description = '' }): Promise<void> {
    await this.userService.createUser(user).then(
      () => {
        this.authService.updateProfile(user.firstname);
        this.dialog.closeAll();
        this.openSnackBar({
          title,
          description,
          panelClass: 'snackbar-success',
          duration: 8000,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openSnackBar({
    title = '',
    description = '',
    panelClass,
    duration,
    firstname = '',
  }): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: title !== '' ? this.translate.instant(title) + firstname : '',
        description:
          description !== '' ? this.translate.instant(description) : '',
      },
      duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [panelClass],
    });
  }
}
