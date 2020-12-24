import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ErroAuthFr } from '../../utils/errorAuthFr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  confirmForm = false;
  @Output() snackbar = new EventEmitter<any>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgotPassword(email: string): void {
    this.confirmForm = true;
    if (this.form.valid) {
      this.authService.resetPassword(email).then(
        () => {
          this.snackbar.emit({
            title: 'reset-password.email-send-successful',
            panelClass: 'snackbar-success',
            duration: 10000,
          });
          this.dialog.closeAll();
        },
        (error) => {
          this.snackbar.emit({
            title: ErroAuthFr.convertMessage(error),
            panelClass: 'snackbar-error',
            duration: 15000,
          });
        }
      );
    }
  }
}
