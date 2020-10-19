import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('page', [
      state('open', style({
        transform: 'translateX(-2%) scale(0.5)',
        'transform-origin': 'right 50%',
        overflow: 'hidden',
        'border-radius': '1rem',
        cursor: 'pointer'
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
  disabledMenuButton: boolean;
  menuHover: boolean;

  constructor() {
    this.menuOpened = false;
    this.menuClosed = true;
    this.disabledMenuButton = false;
    this.menuHover = false;
  }

  openMenu(open: boolean): void {
    this.menuOpened = open;
    this.disabledMenuButton = true;
    if (open) { this.menuClosed = !open; }
  }

  closeMenuDone(event): void {
    if (event.fromState !== 'void') {
      this.disabledMenuButton = false;
      if (!this.menuOpened) {
        this.menuClosed = true;
      }
    }
  }
}
