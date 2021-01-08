import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCardComponent implements OnInit {
  @Input() productsList: Product[];
  @Input() sellersMap = new Map();
  products: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
