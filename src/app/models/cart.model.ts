import { Product } from './product.model';

export interface Cart {
    readonly products: Product[];
}
