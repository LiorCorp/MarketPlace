import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { forkJoin, Observable } from 'rxjs';
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

  getProductsIdFromCookie(cartCookie: string): string[] {
    if (this.cartIsEmpty()) {
      return [];
    }
    return cartCookie.split(';');
  }

  getProducts(): Observable<ProductCart[][]> {
    const cartCookie: string = this.getCartCookie();
    const productsId: string[] = this.getProductsIdFromCookie(cartCookie);
    return forkJoin(
      productsId.map((id: string) => this.productService.getProductById(id))
    ).pipe(
      map((products: Product[]) => this.getProductsCartBySeller(products))
    );
  }

  private getProductsCartBySeller(products: Product[]): ProductCart[][] {
    const sellersId: string[] = [...new Set(products.map((p) => p.seller.id))];
    const productsCart: ProductCart[] = [];
    const productsCartArray: ProductCart[][] = [];
    products.map((product: Product) => {
      const _product = productsCart.find((p) => p.product.id === product.id);
      if (!_product) {
        productsCart.push({ product, quantity: 1, totalPrice: product.price });
      } else {
        const index = productsCart.indexOf(_product);
        const newQuantity = productsCart[index].quantity + 1;
        productsCart[index] = {
          ..._product,
          quantity: newQuantity,
          totalPrice: _product.product.price * newQuantity,
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

  addProduct(productId: string): void {
    if (!this.cookieService.check('cart')) {
      this.cookieService.set('cart', productId, 7);
    } else {
      let productsIdString: string = this.getCartCookie();
      productsIdString = productsIdString + ';' + productId;
      this.cookieService.set('cart', productsIdString, 7);
    }
  }

  removeProduct(productId: string): void {
    let productsIdString: string = this.getCartCookie();
    const separator = ';';
    let productsId = productsIdString.split(separator);
    productsId = productsId.filter((id) => id !== productId);
    productsIdString = productsId.join(separator);
    this.cookieService.set('cart', productsIdString, 7);
  }

  cartIsEmpty(): boolean {
    return !this.cookieService.check('cart');
  }

  updateQuantityProductCard(productId: string, newQuantity: number): void {
    let productsIdString: string = this.getCartCookie();
    const separator = ';';
    const productsId: string[] = productsIdString.split(separator);
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
    this.cookieService.set('cart', productsIdString, 7);
  }

  private getQuantityProductCart(productId: string): number {
    const separator = ';';
    const productsId: string[] = this.getCartCookie().split(separator);
    return productsId.reduce((a, v) => (v === productId ? a + 1 : a), 0);
  }
}
