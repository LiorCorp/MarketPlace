import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrls: ['./product-card-cart.component.scss'],
})
export class ProductCardCartComponent implements OnInit {
  @Input() productsList: Product[];
  constructor() {}

  ngOnInit(): void {}
}
