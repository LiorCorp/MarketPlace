import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  getProductById(
    productId: string
  ): Observable<QueryDocumentSnapshot<ProductData>> {
    return this.productCollection.doc(productId).get();
  }

  getProducts(): Observable<Product[]> {
    return this.getProductsWithValueChanges().pipe(
      switchMap((products: ProductData[]) => {
        return combineLatest([
          of(products),
          combineLatest(
            products.map((product: ProductData) =>
              this.sellerService.getSellerById(product.sellerId)
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

  // getProductsTest(): Observable<ProductData[]> {
  //   return this.productCollection.snapshotChanges().pipe(
  //     map((products: DocumentChangeAction<ProductData>[]) => {
  //       return products.map((product: DocumentChangeAction<ProductData>) => {
  //         const data: ProductData = product.payload.doc.data();
  //         const sellerId: string = data.sellerId;
  //         return this.sellerService.getSellerById(sellerId).pipe(
  //           map((seller: Seller) => {
  //             return Object.assign({ ...data, seller });
  //           })
  //         );
  //       });
  //     }),
  //     mergeMap((products) => {
  //       return combineLatest(products);
  //     })
  //   );
  // }

  getProductsWithValueChanges(): Observable<ProductData[]> {
    return this.productCollection.valueChanges({
      idField: 'id',
    });
  }

  getProductsWithSnapshotChanges(): Observable<
    DocumentChangeAction<ProductData>[]
  > {
    return this.productCollection.snapshotChanges();
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
