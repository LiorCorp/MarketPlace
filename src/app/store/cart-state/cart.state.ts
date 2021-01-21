import { State } from '@ngxs/store';
import { ProductCart } from '../../models/product-cart.model';
import { CartService } from './../../services/cart.service';

export interface CartStateModel {
  productCart: ProductCart[];
  totalAmount: number;
  totalDiscounts: number;
  totalAmountWithDiscounts: number;
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    productCart: null,
    totalAmount: 0,
    totalDiscounts: 0,
    totalAmountWithDiscounts: 0,
  },
})
export class CartState {
  constructor(private readonly cartService: CartService) {}
}
