import { Brand } from './brand.model';
import { Category } from './category.model';
import { Seller } from './seller.model';

export interface Product {
  readonly id?: string;
  readonly seller?: Seller;
  readonly name?: string;
  readonly img?: string;
  readonly description?: string;
  readonly price?: number;
  readonly discountPrice?: number;
  readonly promotion?: number;
  readonly brand?: Brand;
  readonly orderMin?: number;
  readonly category?: Category;
}
