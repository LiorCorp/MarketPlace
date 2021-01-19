import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Product } from '../../models/Product.model';
import { Seller } from '../../models/seller.model';
import { ProductService } from '../../services/product.service';
import { ProductData } from './../../models/product.data.model';
import { SellerService } from './../../services/seller.service';
import { FetchAllProducts, FetchSellerById } from './app.actions';

export interface AppStateModel {
  products: ProductData[];
  sellers: Seller[];
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    products: [],
    sellers: [],
  },
})
@Injectable()
export class AppState {
  constructor(
    private readonly productService: ProductService,
    private readonly sellerService: SellerService
  ) {}

  @Selector()
  static products(state: AppStateModel): Product[] {
    const sellers = state.sellers;
    const products: Product[] = [];
    state.products.map((_product) => {
      let product: Product;
      const seller = sellers.find((s) => s.id === _product.sellerId);
      product = {
        id: _product.id,
        name: _product.name,
        price: _product.price,
        discountPrice: _product.discountPrice,
        seller,
      };
      products.push(product);
    });
    return products;
  }

  @Action(FetchAllProducts)
  fetchAll({
    getState,
    patchState,
    dispatch,
  }: StateContext<AppStateModel>): Observable<Product[]> {
    return this.productService.getProductsWithValueChanges().pipe(
      take(1),
      tap((products: ProductData[]) => {
        patchState({
          ...getState(),
          products,
        });
        const sellersId: string[] = [
          ...new Set(products.map((p) => p.sellerId)),
        ];
        sellersId.map((idSeller) => dispatch(new FetchSellerById(idSeller)));
      })
    );
  }

  @Action(FetchSellerById)
  getSellerById(
    { getState, patchState }: StateContext<AppStateModel>,
    action: FetchSellerById
  ): Observable<void> {
    return this.sellerService.getSellerById(action.idSeller).pipe(
      take(1),
      map((seller) => {
        patchState({
          ...getState(),
          sellers: [...getState().sellers, seller],
        });
      })
    );
  }
}
