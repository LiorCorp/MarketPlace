import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-bubble-menu',
  templateUrl: './bubble-menu.component.html',
  styleUrls: ['./bubble-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleMenuComponent implements OnInit {
  @Output() signout = new EventEmitter<void>();
  @Input() bubbleHover: boolean;
  @Input() menuItems: any[];
  constructor() {}

  ngOnInit(): void {}

  onSignOut(): void {
    this.signout.emit();
  }

  onMethod(output: EventEmitter<any>): void {
    if (output) {
      output.emit();
    }
  }
}
