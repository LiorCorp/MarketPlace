import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() fullStar: number;

  constructor() {}

  ngOnInit(): void {}

  get rating(): string[] {
    const rating = [];
    for (let star = 0; star < 5; star++) {
      if (star <= this.fullStar) {
        rating.push('★');
      } else {
        rating.push('☆');
      }
    }
    return rating;
  }
}
