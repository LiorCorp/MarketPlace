import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../models/Product.model';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  quantities = ['1', '2', '3', '4', '5'];
  selectedQuantity = '1';
  product: Product;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService
      .getProductById(this.route.snapshot.params.id)
      .subscribe((product) => {
        this.productService
          .getProductImg(product.data().img)
          .then((url) => (this.product = { ...product.data(), img: url }));
      });
  }

  quantityValue(): void {
    console.log(this.selectedQuantity);
  }
}
