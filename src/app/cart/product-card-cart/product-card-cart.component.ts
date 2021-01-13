import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductCart } from 'src/app/models/product-cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrls: ['./product-card-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardCartComponent implements OnInit {
  @Input() productsCartArray: ProductCart[][];
  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    console.warn(this.productsCartArray);
  }

  removeProduct(
    productId: string,
    productsCart: ProductCart[],
    index: number
  ): void {
    if (index > -1) {
      this.cartService.removeProduct(productId);
      const indexArray = this.productsCartArray.indexOf(productsCart);
      this.productsCartArray[indexArray].splice(index, 1);
      productsCart.splice(index, 1);
    }
  }
}
