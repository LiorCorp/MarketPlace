import { Category } from './category.model';

export interface Product {
  readonly id: string;
  readonly sellerId: string;
  readonly productName: string;
  readonly description: string;
  readonly price: number;
  readonly promotion: number;
  readonly brand: string;
  readonly orderMin: number;
  readonly category: Category;
}
