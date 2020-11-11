import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(): void {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.signInUser(email, password);
  }

  signInUser(email: string, password: string): void {
    this.authService.signInUser(email, password).then(
      (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
