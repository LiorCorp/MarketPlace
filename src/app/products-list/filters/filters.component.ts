import { Options } from '@angular-slider/ngx-slider/options';
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
  };
  constructor() {}

  ngOnInit(): void {}
}
