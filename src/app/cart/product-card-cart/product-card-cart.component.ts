import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCart } from '../../models/product-cart.model';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrls: ['./product-card-cart.component.scss'],
})
export class ProductCardCartComponent implements OnInit {
  @Input() productsCartArray$: Observable<ProductCart[][]>;
  @Output() removeProductOutput = new EventEmitter();
  @Output() updateQuantityOutput = new EventEmitter();
  quantityMaxByProduct: number[];
  constructor() {
    this.quantityMaxByProduct = Array(10)
      .fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit(): void {}

  removeProduct(
    productId: string,
    productsCart: ProductCart[],
    indexChild: number
  ): void {
    this.removeProductOutput.emit({ productId, productsCart, indexChild });
  }

  updateQuantityProductCart(
    productsCart: ProductCart[],
    productCart: ProductCart,
    newQuantity: string
  ): void {
    this.updateQuantityOutput.emit({ productsCart, productCart, newQuantity });
  }
}
