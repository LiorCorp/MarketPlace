import { Product } from './product.model';

export interface Order {
    readonly date: string;
    readonly status: string;
    readonly products: Product[];
}
