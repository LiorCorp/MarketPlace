import { Component, OnInit } from '@angular/core';
import { ProductCart } from '../models/product-cart.model';
import { Product } from '../models/Product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsCart: ProductCart[];
  productsCartArray: ProductCart[][];
  sellersId: string[];
  isLoaded = false;
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    const productsIdFromCookie: string = this.cartService.getProducts();
    const productsId: string[] = this.getProductsIdFromCookie(
      productsIdFromCookie
    );
    if (productsId.length > 0) {
      this.productsCart = [];
      productsId.forEach((productId) => {
        this.productService.getProductById(productId).subscribe((product) => {
          this.AddProductInCartOrUpdateQuantity(product);
          if ([...new Set(productsId)].length === this.productsCart.length) {
            this.groupProductsInCartBySeller();
          }
        });
      });
    }
  }

  getProductsIdFromCookie(productsIdFromCookie: string): string[] {
    if (this.cartService.cartIsEmpty()) {
      return [];
    }
    return productsIdFromCookie.split(';');
  }

  AddProductInCartOrUpdateQuantity(product: Product): void {
    let productInCart = { product, quantity: 1 };

    const _product: ProductCart = this.productsCart.find(
      (p) => p.product.id === product.id
    );
    if (!_product) {
      this.productsCart.push(productInCart);
    } else {
      const index = this.productsCart.findIndex(
        (p) => p.product.id === productInCart.product.id
      );
      this.productsCart[index] = {
        ...productInCart,
        quantity: this.productsCart[index].quantity + 1,
      };
    }
  }

  groupProductsInCartBySeller(): void {
    this.sellersId = [
      ...new Set(this.productsCart.map((p) => p.product.seller.id)),
    ];
    let productsInCartBySeller: ProductCart[];
    this.productsCartArray = [];
    this.sellersId.forEach((sellerId) => {
      productsInCartBySeller = this.productsCart.filter(
        (p) => p.product.seller.id === sellerId
      );
      this.productsCartArray.push(productsInCartBySeller);
    });
    this.isLoaded = true;
  }
}
