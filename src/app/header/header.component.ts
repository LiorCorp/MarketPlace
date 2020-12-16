import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../services/auth.service';
import { SnackbarComponent } from '../ui/snackbar/snackbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: firebase.default.User;
  bubbleAccountHover = false;

  constructor(
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.authStatusListener();
    this.authService.currentAuthStatus.subscribe(
      (authStatus) => (this.isAuthenticated = authStatus)
    );
  }

  openAuthDialog(): void {
    if (!this.isAuthenticated) {
      this.dialog.open(AuthComponent);
    }
  }

  onSignOut(): void {
    this.authService.signOutUser();
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: 'Déconnexion réussie',
      },
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }
}
