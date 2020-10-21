import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(readonly fakeService: FakeService) { }

  ngOnInit(): void {
    this.products = this.fakeService.getProducts();
  }


}
