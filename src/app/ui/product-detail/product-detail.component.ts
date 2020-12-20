import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  quantities = ['1', '2', '3', '4', '5'];
  selectedQuantity = '1';

  constructor() {}

  ngOnInit(): void {}

  quantityValue(): void {
    console.log(this.selectedQuantity);
  }
}
