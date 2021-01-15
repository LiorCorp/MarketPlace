import { Product } from './Product.model';

export interface ProductCart {
  readonly product?: Product;
  readonly quantity?: number;
  readonly totalPrice?: number;
  readonly totalDiscountPrice?: number;
}
