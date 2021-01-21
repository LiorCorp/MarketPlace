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
  FetchBrandById,
  FetchCurrentProduct,
  FetchProductImg,
  FetchProducts,
  FetchSellerById,
} from './app.actions';

export interface AppStateModel {
  products: ProductData[];
  product: ProductData;
  sellers: Seller[];
  brands: Brand[];
  productImages: string[];
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    products: null,
    product: null,
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
      return this.mapProductsDataToProducts(state);
    }
    return null;
  }

  @Selector()
  static product(state: AppStateModel): Product {
    return this.mapProductDataToProduct(state, state.product);
  }

  static mapProductsDataToProducts(state: AppStateModel): Product[] {
    const products: Product[] = [];
    state.products.map((_product: ProductData) => {
      const product = this.mapProductDataToProduct(state, _product);
      products.push(product);
    });
    return products;
  }

  static mapProductDataToProduct(
    state: AppStateModel,
    _product: ProductData
  ): Product {
    const seller: Seller = state.sellers.find(
      (s) => s.id === _product.sellerId
    );
    const brand: Brand = state.brands.find((b) => b.id === _product.brandId);
    const img: string = state.productImages.find((pi) =>
      pi.includes(_product.img)
    );
    return {
      id: _product.id,
      name: _product.name,
      price: _product.price,
      discountPrice: _product.discountPrice,
      seller,
      brand,
      img,
    } as Product;
  }

  @Action(FetchProducts)
  fetchProducts({
    getState,
    patchState,
    dispatch,
  }: StateContext<AppStateModel>): Observable<ProductData[]> {
    return this.productService.getProducts().pipe(
      take(1),
      tap((products: ProductData[]) => {
        const sellersId: string[] = [
          ...new Set(products.map((p) => p.sellerId)),
        ];
        const brandsId: string[] = [...new Set(products.map((p) => p.brandId))];
        sellersId.map((sellerId: string) => {
          const seller = getState().sellers.find((s) => s.id === sellerId);
          if (!seller) {
            dispatch(new FetchSellerById(sellerId));
          }
        });
        brandsId.map((brandId: string) => {
          const brand = getState().brands.find((b) => b.id === brandId);
          if (!brand) {
            dispatch(new FetchBrandById(brandId));
          }
        });
        products.map((product) => {
          const img = getState().productImages.find((pi) =>
            pi.includes(product.img)
          );
          if (!img) {
            dispatch(new FetchProductImg(product.img));
          }
        });
        patchState({
          ...getState(),
          products,
        });
      })
    );
  }

  @Action(FetchCurrentProduct)
  getProductById(
    { getState, patchState, dispatch }: StateContext<AppStateModel>,
    action: FetchCurrentProduct
  ): Observable<ProductData> {
    return this.productService.getProductById(action.productId).pipe(
      take(1),
      tap((product: ProductData) => {
        const img = getState().productImages.find((pi) =>
          pi.includes(product.img)
        );
        const seller = getState().sellers.find(
          (s) => s.id === product.sellerId
        );
        const brand = getState().brands.find((b) => b.id === product.brandId);
        if (!img) {
          dispatch(new FetchProductImg(product.img));
        }
        if (!seller) {
          dispatch(new FetchSellerById(product.sellerId));
        }
        if (!brand) {
          dispatch(new FetchBrandById(product.brandId));
        }
        patchState({
          ...getState(),
          product,
        });
      })
    );
  }

  @Action(FetchProductImg)
  async getProductImg(
    { getState, patchState }: StateContext<AppStateModel>,
    action: FetchProductImg
  ): Promise<void | string> {
    return await this.productService.getProductImg(action.img).then((img) => {
      patchState({
        ...getState(),
        productImages: [...getState().productImages, img],
      });
    });
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
}
