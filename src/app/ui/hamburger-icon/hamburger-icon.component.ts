import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger-icon',
  templateUrl: './hamburger-icon.component.html',
  styleUrls: ['./hamburger-icon.component.scss'],
})
export class HamburgerIconComponent {
  @Output() openMenuEvent = new EventEmitter<boolean>();
  @Input() menuStatus: boolean;
  @Input() disabled: boolean;

  constructor() {
    this.menuStatus = false;
    this.disabled = false;
  }

  openMenu(menuStatus: boolean): void {
    this.menuStatus = !menuStatus;
    this.openMenuEvent.emit(this.menuStatus);
  }
}
