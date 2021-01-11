import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productsList$: Observable<Product[]>;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productsList$ = this.productService.getProducts();
  }
}
