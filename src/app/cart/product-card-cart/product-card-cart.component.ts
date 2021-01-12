import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductCart } from 'src/app/models/product-cart.model';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrls: ['./product-card-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardCartComponent implements OnInit {
  @Input() productsCartArray: ProductCart[][];
  constructor() {}

  ngOnInit(): void {
    console.warn(this.productsCartArray);
  }
}
