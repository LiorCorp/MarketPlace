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
import { ErroAuthFr } from '../utils/errorAuthFr';
import { UserService } from './../services/user.service';
import { SnackbarComponent } from './../ui/snackbar/snackbar.component';
import { SignModeEnum } from './enum/sign-mode.enum';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signMode = SignModeEnum.SignIn;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    public readonly dialog: MatDialog,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {}

  get SignModeEnum(): typeof SignModeEnum {
    return SignModeEnum;
  }

  changeSignMode(signin: SignModeEnum): void {
    this.signMode = signin;
  }

  async loginWithGoogle(): Promise<void> {
    await this.authService.loginWithGoogle().then(
      async (res) => {
        const user: User = {
          firstname: res.additionalUserInfo.profile['given_name'],
          lastname: res.additionalUserInfo.profile['family_name'],
          email: res.additionalUserInfo.profile['email'],
        };
        this.signInWithPopup(user);
      },
      (err) =>
        this.openSnackBar({
          title: ErroAuthFr.convertMessage(err),
          panelClass: 'snackbar-error',
          duration: 15000,
        })
    );
  }

  async loginWithFacebook(): Promise<void> {
    await this.authService.loginWithFacebook().then(
      async (res) => {
        const user: User = {
          firstname: res.additionalUserInfo.profile['first_name'],
          lastname: res.additionalUserInfo.profile['last_name'],
          email: res.additionalUserInfo.profile['email'],
        };
        this.signInWithPopup(user);
      },
      (err) =>
        this.openSnackBar({
          title: ErroAuthFr.convertMessage(err),
          panelClass: 'snackbar-error',
          duration: 15000,
        })
    );
  }

  async signInWithPopup(user: User): Promise<void> {
    await this.userService.userExist(user.email).then((isExist) => {
      if (!isExist) {
        this.createUser({
          user,
          title: 'signup.success-with-popup.title',
          description: 'signup.success-with-popup.description',
        });
      } else {
        this.openSnackBar({
          title: 'signin.success.title',
          description: 'signin.success.description',
          panelClass: 'snackbar-success',
          duration: 5000,
          firstname: user.firstname,
        });
        this.dialog.closeAll();
      }
    });
  }

  async createUser({ user, title, description }): Promise<void> {
    await this.userService.createUser(user).then(
      () => {
        this.authService.updateProfile(user.firstname);
        this.openSnackBar({
          title,
          description,
          panelClass: 'snackbar-success',
          duration: 8000,
        });
        this.dialog.closeAll();
      },
      (error) => {
        console.error(ErroAuthFr.convertMessage(error));
      }
    );
  }

  showResetPassword(): void {
    this.signMode = SignModeEnum.ResetPassword;
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
