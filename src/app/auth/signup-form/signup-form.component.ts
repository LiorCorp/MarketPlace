import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErroAuthFr } from 'src/app/utils/errorAuthFr';
import { StringUtil } from 'src/app/utils/stringUtil';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  confirmForm = false;
  errorMessage: string;
  @Output() snackbar = new EventEmitter();
  @Output() createUser = new EventEmitter();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.signupForm = this.initSignupForm();
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
          Validators.minLength(8),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  checkPassword(): boolean {
    const password = this.signupForm.controls.password.value;
    const confirmPassword = this.signupForm.controls.confirmPassword.value;
    return (
      this.signupForm.controls.password.valid && password === confirmPassword
    );
  }

  signup(): void {
    this.errorMessage = '';
    this.confirmForm = true;
    if (this.signupForm.valid && this.checkPassword()) {
      this.signupUser();
    }
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
          this.createUser.emit({
            user,
            title: 'signup.success.title',
            description: 'signup.success.description',
          });
        },
        (error) => {
          this.snackbar.emit({
            title: ErroAuthFr.convertMessage(error),
            panelClass: 'snackbar-error',
            duration: 15000,
          });
          this.errorMessage = ErroAuthFr.convertMessage(error);
        }
      );
  }
}
