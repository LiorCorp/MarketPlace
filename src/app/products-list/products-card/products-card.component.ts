import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/services/fake.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/Product.model';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss'],
})
export class ProductsCardComponent implements OnInit {
  productsList: Product[];

  constructor(
    readonly fakeService: FakeService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService
      .getHomeProducts(36)
      .then((products) => (this.productsList = products));
  }
}
