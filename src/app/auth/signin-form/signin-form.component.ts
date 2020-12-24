import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ErroAuthFr } from '../../utils/errorAuthFr';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit {
  signinForm: FormGroup;
  confirmForm = false;
  errorMessage: string;
  @Output() snackbar = new EventEmitter<any>();
  @Output() resetPassword = new EventEmitter<boolean>();

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
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signin(): void {
    this.errorMessage = '';
    this.confirmForm = true;
    if (this.signinForm.valid) {
      this.signinUser();
    }
  }

  async signinUser(): Promise<void> {
    const email = this.signinForm.controls.email.value;
    const password = this.signinForm.controls.password.value;
    await this.authService.signInUser(email, password).then(
      (res) => {
        this.authService.isLoggedIn.then((userVerified) => {
          this.dialog.closeAll();
          if (userVerified) {
            this.snackbar.emit({
              title: 'signin.success.title',
              description: 'signin.success.description',
              panelClass: 'snackbar-success',
              duration: 5000,
              firstname: res.user.displayName,
            });
          } else {
            this.snackbar.emit({
              title: 'signin.warning.title',
              description: 'signin.warning.description',
              panelClass: 'snackbar-warning',
              duration: 10000,
              firstname: res.user.displayName,
            });
          }
        });
      },
      (error) => {
        this.snackbar.emit({
          title: ErroAuthFr.convertMessage(error),
          panelClass: 'snackbar-error',
          duration: 15000,
        });
        this.errorMessage = ErroAuthFr.convertMessage(error);
        if (error.code === 'auth/wrong-password') {
          this.signinForm.controls.password.setErrors({ incorrect: true });
        } else if (error.code === 'auth/user-not-found') {
          this.signinForm.controls.email.setErrors({ incorrect: true });
          this.signinForm.controls.password.setErrors({ incorrect: true });
        }
      }
    );
  }

  passwordForget(): void {
    this.resetPassword.emit();
  }
}
