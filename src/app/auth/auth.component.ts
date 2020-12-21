import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { StringUtil } from './../utils/stringUtil';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signForm: FormGroup;
  signinMode = true;
  confirmSigninForm = false;
  confirmSignupForm = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorSignupMessage: string;
  errorSigninMessage: string;
  resetPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    public readonly dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      signinForm: this.initSigninForm(),
      signupForm: this.initSignupForm(),
    });
  }

  initSigninForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  initSignupForm(): FormGroup {
    return this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-z ,.'-]+$/i),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-z ,.'-]+$/i),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get signinForm(): FormGroup {
    return this.signForm.get('signinForm') as FormGroup;
  }

  get signupForm(): FormGroup {
    return this.signForm.get('signupForm') as FormGroup;
  }

  changeSignMode(signin: boolean): void {
    this.signinMode = signin;
    if (signin) {
      this.confirmSignupForm = false;
      this.errorSignupMessage = '';
    } else {
      this.confirmSigninForm = false;
      this.errorSigninMessage = '';
    }
  }

  checkPassword(): boolean {
    const password = this.signupForm.controls.password.value;
    const confirmPassword = this.signupForm.controls.confirmPassword.value;
    return (
      this.signupForm.controls.password.valid && password === confirmPassword
    );
  }

  signin(): void {
    this.errorSigninMessage = '';
    this.confirmSigninForm = true;
    if (this.signinForm.valid) {
      this.signinUser();
    }
  }

  signup(): void {
    this.errorSignupMessage = '';
    this.confirmSignupForm = true;
    if (this.signupForm.valid && this.checkPassword()) {
      this.signupUser();
    }
  }

  async signinUser(): Promise<void> {
    const email = this.signinForm.controls.email.value;
    const password = this.signinForm.controls.password.value;
    await this.authService.signInUser(email, password).then(
      (res) => {
        this.dialog.closeAll();
        this.authService.isLoggedIn.then((userVerified) => {
          if (userVerified) {
            this.openSnackBar({
              title: 'signin.success.welcome',
              description: '',
              panelClass: 'snackbar-success',
              duration: 3000,
              firstname: res.user.displayName,
            });
          } else {
            this.openSnackBar({
              title: 'signin.warning.welcome',
              description: 'signin.warning.description',
              panelClass: 'snackbar-warning',
              duration: 800000,
              firstname: res.user.displayName,
            });
          }
        });
      },
      (error) => {
        if (error === 'auth/too-many-requests') {
          this.openSnackBar({
            title: 'signin.error.tooManyRequests',
            panelClass: 'snackbar-error',
            duration: 10000,
          });
        } else {
          this.errorSigninMessage = error;
        }
      }
    );
  }

  async signupUser(): Promise<void> {
    const user: User = {
      firstname: StringUtil.capitalize(
        this.signupForm.controls.firstname.value
      ),
      lastname: StringUtil.capitalize(this.signupForm.controls.lastname.value),
      email: this.signupForm.controls.email.value,
    };
    await this.authService
      .createUserWithEmailAndPassword(
        user,
        this.signupForm.controls.password.value
      )
      .then(
        () => {
          this.createUser(
            user,
            'signup.success.title',
            'signup.success.description'
          );
        },
        (error) => {
          this.errorSignupMessage = error;
        }
      );
  }

  async loginWithGoogle(): Promise<void> {
    await this.authService.loginWithGoogle().then(async (res) => {
      const user: User = {
        firstname: res.additionalUserInfo.profile['given_name'],
        lastname: res.additionalUserInfo.profile['family_name'],
        email: res.additionalUserInfo.profile['email'],
      };
      console.log(user);
      // vérfier si on a déjà ces infos pas besoin de update à chaque fois...
      this.authService.updateProfile(user.firstname);
      await this.userService.userExist(user.email).then((isExist) => {
        if (!isExist) {
          this.createUser(user, 'signin.success.welcome', '');
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
      console.log(user);
      // vérfier si on a déjà ces infos pas besoin de update à chaque fois...
      this.authService.updateProfile(user.firstname);
      await this.userService.userExist(user.email).then((isExist) => {
        if (!isExist) {
          this.createUser(user, 'signin.success.welcome', '');
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

  async createUser(
    newUser: User,
    title: string,
    description: string
  ): Promise<void> {
    await this.userService.createUser(newUser).then(
      () => {
        this.authService.updateProfile(newUser.firstname);
        this.dialog.closeAll();
        this.openSnackBar({
          title,
          description,
          panelClass: 'snackbar-success',
          duration: 8000,
        });
      },
      (error) => {
        this.errorSignupMessage = error;
      }
    );
  }

  forgotPassword(email: string): void {
    this.authService.resetPassword(email);
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
