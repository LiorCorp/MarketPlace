import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderButtonsComponent implements OnInit {
  @Output() authDialog = new EventEmitter<void>();
  @Output() signout = new EventEmitter<void>();
  @Input() isAuthenticated: firebase.default.User;
  @Input() bubbleAccountHover: boolean;
  accountMenuItems = [
    { name: 'title' },
    { name: 'wishlist' },
    { name: 'myVouchers' },
    { name: 'myReimbursements' },
    { name: 'myRecommendations' },
    { name: 'frequentlyAskedQuestions' },
    { name: 'logout', method: this.signout },
  ];

  constructor() {}

  ngOnInit(): void {}

  openAuthDialog(): void {
    this.authDialog.emit();
  }

  onSignOut(): void {
    this.signout.emit();
  }
}
