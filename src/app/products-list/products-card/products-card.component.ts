import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeService } from 'src/app/services/fake.service';
import { Product } from './../../models/Product.model';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss'],
})
export class ProductsCardComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(readonly fakeService: FakeService) {}

  ngOnInit(): void {
    this.products = this.fakeService.getProducts();
  }
}
