import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productsList: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getHomeProducts(36)
      .then((products) => (this.productsList = products));
  }
}
