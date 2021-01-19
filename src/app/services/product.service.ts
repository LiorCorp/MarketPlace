import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { ProductData } from './../models/product.data.model';
import { BrandService } from './brand.service';
import { SellerService } from './seller.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productCollection: AngularFirestoreCollection<ProductData> = this.firestore.collection(
    'Product'
  );

  constructor(
    private firestore: AngularFirestore,
    private readonly sellerService: SellerService,
    private readonly brandService: BrandService
  ) {}

  getProductById(productId: string): Observable<Product> {
    return this.productCollection
      .doc(productId)
      .valueChanges({
        idField: 'id',
      })
      .pipe(
        take(1),
        switchMap((_product) => {
          return forkJoin({
            product: of(_product),
            seller: this.sellerService.getSellerByIdOld(_product.sellerId),
            brand: this.brandService.getBrandById(_product.brandId),
            img: this.getProductImg(_product.img),
          }).pipe(
            map((data) => {
              const product = data.product;
              return {
                id: product.id,
                name: product.name,
                img: data.img,
                price: product.price,
                discountPrice: product.discountPrice,
                seller: data.seller,
                brand: data.brand,
              } as Product;
            })
          );
        })
      );
  }

  getProducts(): Observable<Product[]> {
    return this.getProductsWithValueChanges().pipe(
      switchMap((products: ProductData[]) => {
        return combineLatest([
          of(products),
          combineLatest(
            products.map((product: ProductData) =>
              this.sellerService.getSellerByIdOld(product.sellerId)
            )
          ),
          combineLatest(
            products.map((product: ProductData) =>
              this.brandService.getBrandById(product.brandId)
            )
          ),
          combineLatest(
            products.map((product: ProductData) =>
              this.getProductImg(product.img)
            )
          ),
        ]);
      }),
      map(([products, sellers, brands, imgs]) => {
        return products.map((product: ProductData) => {
          return {
            id: product.id,
            name: product.name,
            img: imgs.find((img) => img.includes(product.img)),
            price: product.price,
            discountPrice: product.discountPrice,
            seller: sellers.find((seller) => seller.id === product.sellerId),
            brand: brands.find((brand) => brand.id === product.brandId),
          } as Product;
        });
      })
    );
  }

  getProductsWithValueChanges(): Observable<ProductData[]> {
    return this.productCollection.valueChanges({
      idField: 'id',
    });
  }

  async getProductImg(img: string): Promise<string> {
    return await new Promise((resolve) => {
      firebase.default
        .storage()
        .ref()
        .child('products/' + img)
        .getDownloadURL()
        .then((url: string) => {
          resolve(url);
        });
    });
  }

  async createProduct(
    product: ProductData
  ): Promise<DocumentReference<ProductData>> {
    return await this.productCollection
      .add(product)
      .then((doc: DocumentReference<ProductData>) => doc);
  }

  async updateProduct(productId: string, product: ProductData): Promise<void> {
    return await this.productCollection.doc(productId).update(product);
  }

  async getDocumentSnapshot(
    limit: number
  ): Promise<QuerySnapshot<ProductData>> {
    return await this.productCollection.ref
      .limit(limit)
      .get()
      .then((doc: QuerySnapshot<ProductData>) => doc);
  }

  async getNextDocumentSnapshot(
    limit: number,
    documentSnapshots: QuerySnapshot<Product>
  ): Promise<QuerySnapshot<ProductData>> {
    return await this.productCollection.ref
      .startAt(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      .limit(limit)
      .get()
      .then((doc: QuerySnapshot<ProductData>) => doc);
  }
}
