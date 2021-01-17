import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCart } from '../models/product-cart.model';
import { Product } from '../models/Product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly productService: ProductService
  ) {}

  getCartCookie(): string {
    return this.cookieService.get('cart');
  }

  getProductsIdFromCookie(productsIdString: string): string[] {
    if (productsIdString.length === 0 || !this.cartCookieExist()) {
      return [];
    }
    return productsIdString.split(';');
  }

  getProducts(): Observable<ProductCart[][]> {
    const productsIdString: string = this.getCartCookie();
    const productsId: string[] = this.getProductsIdFromCookie(productsIdString);
    if (productsId.length > 0) {
      return forkJoin(
        productsId.map((id: string) => this.productService.getProductById(id))
      ).pipe(
        map((products: Product[]) => this.getProductsCartBySeller(products))
      );
    } else {
      return of([]);
    }
  }

  addProduct(productId: string): void {
    let productsIdString: string = this.getCartCookie();
    if (productsIdString.length === 0 || !this.cartCookieExist()) {
      this.updateCartCookie(productId);
    } else {
      productsIdString = productsIdString + ';' + productId;
      this.updateCartCookie(productsIdString);
    }
  }

  updateCartCookie(productsIdString: string): void {
    this.cookieService.set('cart', productsIdString, {
      expires: 7,
      path: '/',
    });
  }

  removeProduct(productId: string): void {
    let productsIdString: string = this.getCartCookie();
    const separator = ';';
    let productsId: string[] = this.getProductsIdFromCookie(productsIdString);
    if (productsId.length > 0) {
      productsId = productsId.filter((id) => id !== productId);
      productsIdString = productsId.join(separator);
      this.updateCartCookie(productsIdString);
    }
  }

  updateQuantityProductCard(productId: string, newQuantity: number): void {
    let productsIdString: string = this.getCartCookie();
    const separator = ';';
    const productsId: string[] = this.getProductsIdFromCookie(productsIdString);
    if (productsId.length > 0) {
      const quantityInCart: number = this.getQuantityProductCart(productId);
      if (newQuantity > quantityInCart) {
        for (newQuantity; newQuantity > quantityInCart; newQuantity--) {
          productsId.push(productId);
        }
      } else if (newQuantity < quantityInCart) {
        for (newQuantity; newQuantity < quantityInCart; newQuantity++) {
          const index: number = productsId.indexOf(productId);
          productsId.splice(index, 1);
        }
      }
      productsIdString = productsId.join(separator);
      this.updateCartCookie(productsIdString);
    }
  }

  private cartCookieExist(): boolean {
    return this.cookieService.check('cart');
  }

  private getQuantityProductCart(productId: string): number {
    const productsIdString: string = this.getCartCookie();
    const productsId: string[] = this.getProductsIdFromCookie(productsIdString);
    return productsId.reduce((a, v) => (v === productId ? a + 1 : a), 0);
  }

  private getProductsCartBySeller(products: Product[]): ProductCart[][] {
    const sellersId: string[] = [...new Set(products.map((p) => p.seller.id))];
    const productsCart: ProductCart[] = [];
    const productsCartArray: ProductCart[][] = [];
    products.map((product: Product) => {
      const _product = productsCart.find((p) => p.product.id === product.id);
      if (!_product) {
        productsCart.push({
          product,
          quantity: 1,
          totalPrice: product.price,
          totalDiscountPrice: product.discountPrice || 0,
        });
      } else {
        const index = productsCart.indexOf(_product);
        const newQuantity = productsCart[index].quantity + 1;
        productsCart[index] = {
          ..._product,
          quantity: newQuantity,
          totalPrice: _product.product.price * newQuantity,
          totalDiscountPrice: _product.product.discountPrice
            ? _product.product.discountPrice * newQuantity
            : 0,
        };
      }
    });
    sellersId.map((sellerId: string) => {
      const productsCartBySeller: ProductCart[] = productsCart.filter(
        (productCart: ProductCart) => productCart.product.seller.id === sellerId
      );
      productsCartArray.push(productsCartBySeller);
    });
    return productsCartArray;
  }
}
