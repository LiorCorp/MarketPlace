import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state/app.state';
import { Product } from './../../models/Product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Select(AppState.product) product$: Observable<Product>;

  constructor(private readonly location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
