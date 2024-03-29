import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductCart } from '../models/product-cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  productsCartArray$: Observable<ProductCart[][]>;
  productsCartArraySub: Subscription;
  totalAmount = 0;
  totalItems = 0;
  totalSavingsRealized = 0;
  constructor(
    private readonly cartService: CartService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.productsCartArray$ = this.cartService.getProducts();
    this.productsCartArraySub = this.getProductsCartArray(
      this.productsCartArray$
    );
  }

  ngOnDestroy(): void {
    this.productsCartArraySub.unsubscribe();
  }

  getProductsCartArray(
    productsCartArray$: Observable<ProductCart[][]>
  ): Subscription {
    return productsCartArray$.subscribe((productsCartArray) => {
      productsCartArray.map((productsCart) => {
        productsCart.map((productCart) => {
          this.totalItems += productCart.totalPrice;
          this.totalAmount += productCart.totalDiscountPrice;
        });
      });
      this.totalSavingsRealized = this.totalItems - this.totalAmount;
    });
  }

  updateTotalPrice(productCart: ProductCart, newQuantity: number): void {
    if (newQuantity > productCart.quantity) {
      for (newQuantity; newQuantity > productCart.quantity; newQuantity--) {
        this.totalAmount += productCart.product.discountPrice;
        this.totalItems += productCart.product.price;
      }
    } else {
      for (newQuantity; newQuantity < productCart.quantity; newQuantity++) {
        this.totalAmount -= productCart.product.discountPrice;
        this.totalItems -= productCart.product.price;
      }
    }
    this.totalSavingsRealized = this.totalItems - this.totalAmount;
  }

  updateQuantityProductCart({ productsCart, productCart, newQuantity }): void {
    const _newQuantity: number = parseInt(newQuantity, 0);
    const index: number = productsCart.indexOf(productCart);
    if (productCart.quantity !== _newQuantity) {
      productsCart[index] = {
        ...productCart,
        quantity: _newQuantity,
        totalPrice: productCart.product?.price * _newQuantity,
        totalDiscountPrice: productCart.product?.discountPrice * _newQuantity,
      } as ProductCart;
      this.updateTotalPrice(productCart, _newQuantity);
      this.cartService.updateQuantityProductCard(
        productCart.product?.id,
        _newQuantity
      );
    }
  }

  removeProductFromCart({
    productId,
    indexParent,
    indexChild,
    productsCartArray,
  }): void {
    if (indexChild > -1) {
      this.updateTotalPrice(productsCartArray[indexParent][indexChild], 0);
      this.cartService.removeProduct(productId);
      productsCartArray[indexParent].splice(indexChild, 1);
      if (productsCartArray[indexParent].length === 0) {
        productsCartArray.splice(indexParent, 1);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
