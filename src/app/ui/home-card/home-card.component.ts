import {
  ChangeDetectionStrategy,
  Component,
  DEFAULT_CURRENCY_CODE,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCardComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() backgroundClass: string;
  @Input() products: Product[];
  @Input() start: number;
  @Input() end: number;
  @Input() promo = false;

  constructor(
    @Inject(DEFAULT_CURRENCY_CODE) public currency: string,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {}
}
