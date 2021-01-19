import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { AppState } from '../store/app-state/app.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Select(AppState.products) productsList$: Observable<Product[]>;

  constructor() {}

  ngOnInit(): void {}
}
