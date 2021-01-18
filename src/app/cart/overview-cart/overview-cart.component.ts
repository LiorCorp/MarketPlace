import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-cart',
  templateUrl: './overview-cart.component.html',
  styleUrls: ['./overview-cart.component.scss'],
})
export class OverviewCartComponent implements OnInit {
  @Input() totalAmount: number;
  @Input() totalItems: number;
  @Input() totalSavingsRealized: number;
  rippleColor = 'rgba(255,255,255,0.3)';
  constructor() {}

  ngOnInit(): void {}

  orderNow(): void {}
}
