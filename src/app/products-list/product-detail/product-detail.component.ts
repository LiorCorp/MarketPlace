import { Location } from '@angular/common';
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
  product: Product;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private location: Location
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

  back(): void {
    this.location.back();
  }
}
