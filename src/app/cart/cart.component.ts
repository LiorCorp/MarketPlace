import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsList: Product[];
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
      this.productsList = [];
      productsId.forEach((productId) => {
        this.productService.getProductById(productId).subscribe((product) => {
          this.productService.getProductImg(product.data().img).then((url) => {
            this.productsList.push({ ...product.data(), img: url });
          });
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
}
