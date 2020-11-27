import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { AuthComponent } from './../../auth/auth.component';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent implements OnInit {
  isAuth: boolean;

  constructor(
    private authService: AuthService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // firebase.default.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.isAuth = true;
    //   } else {
    //     this.isAuth = false;
    //   }
    // });
  }

  openAuthDialog(): void {
    this.dialog.open(AuthComponent);
  }

  onSignOut(): void {
    this.authService.signOutUser();
  }
}
