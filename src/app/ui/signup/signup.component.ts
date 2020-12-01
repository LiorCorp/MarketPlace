import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  @Input() signupForm: FormGroup;
  @Input() confirmForm = false;
  @Input() passwordValidation: boolean;

  constructor() {}

  ngOnInit(): void {}
}
