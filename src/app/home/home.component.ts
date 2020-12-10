import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsList: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getHomeProducts(36)
      .then((products) => (this.productsList = products));
  }
}
