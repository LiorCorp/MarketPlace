import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-bubble-menu',
  templateUrl: './bubble-menu.component.html',
  styleUrls: ['./bubble-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleMenuComponent implements OnInit {
  @Input() bubbleHover: boolean;
  @Input() menuItems: any[];
  constructor() {}

  ngOnInit(): void {}

  onMethod(output: EventEmitter<any>): void {
    if (output) {
      output.emit();
    }
  }
}
