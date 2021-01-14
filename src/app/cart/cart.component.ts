import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCart } from '../models/product-cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsCartArray$: Observable<ProductCart[][]>;
  totalAmount = 0;
  totalItems = 0;
  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.productsCartArray$ = this.cartService.getProducts();
    this.productsCartArray$.subscribe((productsCartArray) => {
      productsCartArray.map((productsCart) => {
        productsCart.map((productCart) => {
          this.totalAmount = this.totalAmount + productCart.totalPrice;
          this.totalItems = this.totalItems + productCart.totalPrice;
        });
      });
    });
  }

  updateQuantityProductCart({ productsCart, productCart, newQuantity }): void {
    const _newQuantity = parseInt(newQuantity, 0);
    const index = productsCart.indexOf(productCart);
    if (productCart.quantity !== _newQuantity) {
      productsCart[index] = {
        ...productCart,
        quantity: _newQuantity,
        totalPrice: productCart.product?.price * _newQuantity,
      };
      this.cartService.updateQuantityProductCard(
        productCart.product?.id,
        _newQuantity
      );
    }
  }

  removeProductFromCart({ productId, productsCart, indexChild }): void {
    if (indexChild > -1) {
      this.cartService.removeProduct(productId);
      productsCart.splice(indexChild, 1);
    }
  }
}
