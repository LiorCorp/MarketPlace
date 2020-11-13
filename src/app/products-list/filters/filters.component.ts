import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  value = 0;
  highValue = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '€';
        case LabelType.High:
          return value + '€';
        default:
          return value + '€';
      }
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
