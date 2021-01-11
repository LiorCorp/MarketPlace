import { Category } from './category.model';

export interface ProductData {
  readonly id?: string;
  readonly sellerId?: string;
  readonly name?: string;
  readonly img?: string;
  readonly description?: string;
  readonly price?: number;
  readonly discountPrice?: number;
  readonly promotion?: number;
  readonly brandId?: string;
  readonly orderMin?: number;
  readonly category?: Category;
}
