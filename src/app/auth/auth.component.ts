import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
  signForm: FormGroup;
  signinMode = true;
  confirmSigninForm = false;
  confirmSignupForm = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    public readonly dialog: MatDialog
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
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  initSignupForm(): FormGroup {
    return this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z]+$/),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
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
    } else {
      this.confirmSigninForm = false;
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
    this.confirmSigninForm = true;
    if (this.signinForm.valid) {
      this.signinUser();
    }
  }

  signup(): void {
    this.confirmSignupForm = true;
    if (this.signupForm.valid && this.checkPassword()) {
      this.signupUser();
    }
  }

  signinUser(): void {
    const email = this.signupForm.controls.email.value;
    const password = this.signupForm.controls.password.value;
    this.authService.signInUser(email, password).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signupUser(): void {
    const user: User = {
      firstname: this.signupForm.controls.firstname.value,
      lastname: this.signupForm.controls.lastname.value,
      email: this.signupForm.controls.email.value,
    };

    this.authService
      .createNewUser(user, this.signupForm.controls.password.value)
      .then(
        (newuser) => {
          console.log(newuser);
          const newUser: User = { ...user, uid: newuser.user.uid };
          this.userService
            .createUser(newUser)
            .then((idDoc) => {
              console.log(idDoc);
              this.dialog.closeAll();
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  title: ' Bienvenue chez Meden !',
                  description: 'Inscription réussit !',
                },
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['snackbar-success'],
              });
            })
            .catch((error) => console.log(error));
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => console.log(error));
  }
}
