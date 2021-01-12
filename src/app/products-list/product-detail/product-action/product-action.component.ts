import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../../models/Product.model';
import { CartService } from './../../../services/cart.service';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss'],
})
export class ProductActionComponent implements OnInit {
  @Input() product$: Observable<Product>;
  quantities = ['1', '2', '3', '4', '5'];
  selectedQuantity = '1';
  constructor(
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  quantityValue(): void {
    console.log(this.selectedQuantity);
  }

  addProductInCart(): void {
    this.cartService.addProduct(this.route.snapshot.params.id);
  }
}
