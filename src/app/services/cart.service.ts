import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly cookieService: CookieService) {}

  getProducts(): string {
    return this.cookieService.get('cart');
  }

  addProduct(productId: string): void {
    if (!this.cookieService.check('cart')) {
      this.cookieService.set('cart', productId, 7);
    } else {
      let products = this.getProducts();
      products = products + ';' + productId;
      this.cookieService.set('cart', products, 7);
    }
  }

  removeProduct(productId: string): void {
    let products = this.getProducts();
    const separator = ';';
    var productsId = products.split(separator);
    for (var i = 0; i < productsId.length; i++) {
      if (productsId[i] == productId) {
        productsId.splice(i, 1);
        products = productsId.join(separator);
        this.cookieService.set('cart', products, 7);
      }
    }
  }

  cartIsEmpty(): boolean {
    return !this.cookieService.check('cart');
  }
}
