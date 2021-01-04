import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/Product.model';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss'],
})
export class ProductActionComponent implements OnInit {
  @Input() product: Product;
  quantities = ['1', '2', '3', '4', '5'];
  selectedQuantity = '1';
  constructor() {}

  ngOnInit(): void {}

  quantityValue(): void {
    console.log(this.selectedQuantity);
  }
}
