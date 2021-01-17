import { Component, Input, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/ui/snackbar/snackbar.component';
import { Product } from '../../../models/Product.model';
import { CartService } from './../../../services/cart.service';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss'],
})
export class ProductActionComponent implements OnInit {
  @Input() product$: Observable<Product>;
  quantityMaxByProduct: number[];
  addProductInCartBtnEnabled = true;
  productId: string;
  productQuantity = 1;
  constructor(
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar
  ) {
    this.quantityMaxByProduct = Array(10)
      .fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
  }

  addProductInCart(): void {
    this.addProductInCartBtnEnabled = false;
    for (let i = 0; i < this.productQuantity; i++) {
      this.cartService.addProduct(this.productId);
    }
    this.addProductInCartBtnEnabled = true;
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: 'Le produit a bien été ajouté dans votre panier',
      },
      duration: 2000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'top' as MatSnackBarVerticalPosition,
      panelClass: ['snackbar-success'],
    });
  }
}
