import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
  @Input() productsList: Product[];
  @Input() start: number;
  @Input() end: number;
  @Input() promo = false;

  constructor() {}

  ngOnInit(): void {}
}
