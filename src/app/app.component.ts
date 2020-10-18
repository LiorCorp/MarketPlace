import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('page', [
      state('open', style({
        transform: 'translateX(-2%) rotateY(40deg) scale(0.65)',
        'transform-origin': 'right 60%',
        'clip-path': 'polygon(0 2%, 100% 0, 100% 100%, 0 97%)',
        overflow: 'hidden',
        'border-radius': '1rem',
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

  constructor(private cdr: ChangeDetectorRef) {
    this.menuOpened = false;
    this.menuClosed = true;
    this.disabledMenuButton = false;
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
