import { Product } from './Product.model';

export interface Cart {
  readonly products: Product[];
}
