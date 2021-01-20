import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Select(AppState.products) productsList$: Observable<Product[]>;
  product: Product;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.productsList$.subscribe((products) => {
      this.product = products.find(
        (p) => p.id === this.route.snapshot.params.id
      );
    });
  }

  goBack(): void {
    this.location.back();
  }
}
