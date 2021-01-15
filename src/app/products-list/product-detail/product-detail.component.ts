import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './../../models/Product.model';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.product$ = this.productService.getProductById(
      this.route.snapshot.params.id
    );
  }

  back(): void {
    this.location.back();
  }
}
