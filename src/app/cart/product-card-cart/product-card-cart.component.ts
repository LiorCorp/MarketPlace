import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCart } from '../../models/product-cart.model';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrls: ['./product-card-cart.component.scss'],
})
export class ProductCardCartComponent implements OnInit {
  @Input() productsCartArray: ProductCart[][];
  @Output() removeProductOutput = new EventEmitter();
  @Output() updateQuantityOutput = new EventEmitter();
  quantityMaxByProduct: number[];
  rippleColor = 'rgba(255,255,255,0.3)';
  constructor() {
    this.quantityMaxByProduct = Array(10)
      .fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit(): void {}

  removeProduct(
    productId: string,
    indexParent: number,
    indexChild: number,
    productsCartArray: ProductCart[][]
  ): void {
    this.removeProductOutput.emit({
      productId,
      indexParent,
      indexChild,
      productsCartArray,
    });
  }

  updateQuantityProductCart(
    productsCart: ProductCart[],
    productCart: ProductCart,
    newQuantity: string
  ): void {
    this.updateQuantityOutput.emit({
      productsCart,
      productCart,
      newQuantity,
    });
  }
}
