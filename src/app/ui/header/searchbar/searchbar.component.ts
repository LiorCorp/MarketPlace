import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('search-button', [
      state(
        'true',
        style({
          'box-shadow': '0px 0px 25px 1px rgba(0,0,0,0.5)',
        })
      ),
      state(
        'false',
        style({
          'box-shadow': 'unset',
        })
      ),
      transition('true <=> false', [animate('300ms')]),
    ]),
  ],
})
export class SearchbarComponent implements OnInit {
  isClicking = false;
  constructor() {}

  ngOnInit(): void {}

  search(): void {
    this.isClicking = true;
  }

  cleanSearchButton(event): void {
    if (event.fromState === 'false') {
      this.isClicking = false;
    }
  }
}
