import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit {
  signinForm: FormGroup;
  confirmForm = false;
  errorMessage: string;
  @Output() snackbar = new EventEmitter();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.signinForm = this.initSigninForm();
  }

  initSigninForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signin(): void {
    this.errorMessage = '';
    this.confirmForm = true;
    if (this.signinForm.valid) {
      this.signinUser();
    }
  }

  forgotPassword(email: string): void {
    this.authService.resetPassword(email);
  }

  async signinUser(): Promise<void> {
    const email = this.signinForm.controls.email.value;
    const password = this.signinForm.controls.password.value;
    await this.authService.signInUser(email, password).then(
      (res) => {
        this.dialog.closeAll();
        this.authService.isLoggedIn.then((userVerified) => {
          if (userVerified) {
            this.snackbar.emit({
              title: 'signin.success.welcome',
              description: '',
              panelClass: 'snackbar-success',
              duration: 3000,
              firstname: res.user.displayName,
            });
          } else {
            this.snackbar.emit({
              title: 'signin.warning.welcome',
              description: 'signin.warning.description',
              panelClass: 'snackbar-warning',
              duration: 8000,
              firstname: res.user.displayName,
            });
          }
        });
      },
      (error) => {
        if (error === 'auth/too-many-requests') {
          this.snackbar.emit({
            title: 'signin.error.tooManyRequests',
            panelClass: 'snackbar-error',
            duration: 10000,
          });
        } else {
          this.errorMessage = error;
        }
      }
    );
  }
}
