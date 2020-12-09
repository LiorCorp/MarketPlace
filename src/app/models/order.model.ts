import { Product } from './Product.model';

export interface Order {
  readonly date: string;
  readonly status: string;
  readonly products: Product[];
}
