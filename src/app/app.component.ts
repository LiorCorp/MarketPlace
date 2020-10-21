import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('page', [
      state('open', style({
        transform: 'translateX(-4%) translateY(4%) scale(0.4)',
        'transform-origin': 'right 50%',
        overflow: 'hidden',
        'border-radius': '1rem',
        cursor: 'pointer',
        'box-shadow': '21px -14px 50px 0px rgba(0,0,0,0.68)'
      })), state('closed', style({
        overflow: 'auto',
      })),
      transition('open <=> closed', [
        animate('300ms')
      ])
    ],
    ),
  ],
})
export class AppComponent {
  menuOpened: boolean;
  menuClosed: boolean;
  menuDisplayed: boolean;
  disabledMenuButton: boolean;

  constructor() {
    this.menuOpened = false;
    this.menuClosed = true;
    this.menuDisplayed = false;
    this.disabledMenuButton = false;
  }

  openMenu(open: boolean): void {
    this.menuOpened = open;
    this.disabledMenuButton = true;
    if (open) { this.menuClosed = false; } else { this.menuDisplayed = false; }
  }

  closeMenuDone(event): void {
    if (event.fromState !== 'void') {
      this.disabledMenuButton = false;
      if (!this.menuOpened) {
        this.menuClosed = true;
      } else {
        this.menuDisplayed = true;
      }
    }
  }

  closeMenu(): void {
    if (this.menuOpened) {
      this.menuOpened = false;
      this.menuDisplayed = false;
    }
  }
}
