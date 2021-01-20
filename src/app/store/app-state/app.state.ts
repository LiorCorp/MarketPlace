import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Brand } from '../../models/brand.model';
import { Product } from '../../models/Product.model';
import { Seller } from '../../models/seller.model';
import { ProductService } from '../../services/product.service';
import { ProductData } from './../../models/product.data.model';
import { BrandService } from './../../services/brand.service';
import { SellerService } from './../../services/seller.service';
import {
  FetchAllProducts,
  FetchBrandById,
  FetchProductImgById,
  FetchSellerById,
} from './app.actions';

export interface AppStateModel {
  products: ProductData[];
  sellers: Seller[];
  brands: Brand[];
  productImages: string[];
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    products: [],
    sellers: [],
    brands: [],
    productImages: [],
  },
})
@Injectable()
export class AppState {
  constructor(
    private readonly productService: ProductService,
    private readonly sellerService: SellerService,
    private readonly brandService: BrandService
  ) {}

  @Selector()
  static products(state: AppStateModel): Product[] {
    const sellersId: string[] = [
      ...new Set(state.products.map((p) => p.sellerId)),
    ];
    const brandsId: string[] = [
      ...new Set(state.products.map((p) => p.brandId)),
    ];
    if (
      sellersId.length === state.sellers.length &&
      brandsId.length === state.brands.length &&
      state.products.length === state.productImages.length
    ) {
      return this.mapProductDataToProduct(state);
    }
    return [];
  }

  static mapProductDataToProduct(state: AppStateModel): Product[] {
    const products: Product[] = [];
    state.products.map((_product: ProductData) => {
      let product: Product;
      const seller: Seller = state.sellers.find(
        (s) => s.id === _product.sellerId
      );
      const brand: Brand = state.brands.find((b) => b.id === _product.brandId);
      const img: string = state.productImages.find((pi) =>
        pi.includes(_product.img)
      );
      product = {
        id: _product.id,
        name: _product.name,
        price: _product.price,
        discountPrice: _product.discountPrice,
        seller,
        brand,
        img,
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
        const sellersId: string[] = [
          ...new Set(products.map((p) => p.sellerId)),
        ];
        const brandsId: string[] = [...new Set(products.map((p) => p.brandId))];
        const imgsId: string[] = [...new Set(products.map((p) => p.img))];
        sellersId.map((sellerId: string) =>
          dispatch(new FetchSellerById(sellerId))
        );
        brandsId.map((brandId: string) =>
          dispatch(new FetchBrandById(brandId))
        );
        imgsId.map((img) => dispatch(new FetchProductImgById(img)));
        patchState({
          ...getState(),
          products,
        });
      })
    );
  }

  @Action(FetchSellerById)
  getSellerById(
    { getState, patchState }: StateContext<AppStateModel>,
    action: FetchSellerById
  ): Observable<Seller> {
    return this.sellerService.getSellerById(action.sellerId).pipe(
      take(1),
      tap((seller: Seller) => {
        patchState({
          ...getState(),
          sellers: [...getState().sellers, seller],
        });
      })
    );
  }

  @Action(FetchBrandById)
  getBrandById(
    { getState, patchState }: StateContext<AppStateModel>,
    action: FetchBrandById
  ): Observable<Brand> {
    return this.brandService.getBandById(action.brandId).pipe(
      take(1),
      tap((brand: Brand) => {
        patchState({
          ...getState(),
          brands: [...getState().brands, brand],
        });
      })
    );
  }

  @Action(FetchProductImgById)
  async getProductImg(
    { getState, patchState }: StateContext<AppStateModel>,
    action: FetchProductImgById
  ): Promise<void | string> {
    return await this.productService.getProductImg(action.img).then((img) => {
      patchState({
        ...getState(),
        productImages: [...getState().productImages, img],
      });
    });
  }
}
