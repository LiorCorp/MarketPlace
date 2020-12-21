import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit {
  @Input() signinForm: FormGroup;
  @Input() confirmForm = false;
  @Output() resetPassword = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  forgotPassword(): void {
    this.resetPassword.emit(this.signinForm.controls.email.value);
  }
}
