import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Product> = this.firestore.collection(
    'Product'
  );

  constructor(private firestore: AngularFirestore) {}

  getProductById(
    productId: string
  ): Observable<QueryDocumentSnapshot<Product>> {
    return this.productCollection.doc(productId).get();
  }

  async getHomeProducts(limit: number): Promise<Product[]> {
    const products: Product[] = [];
    return await this.productCollection.ref
      .limit(limit)
      .get()
      .then((documentSnapshots: QuerySnapshot<Product>) => {
        documentSnapshots.docs.forEach(
          (doc: QueryDocumentSnapshot<Product>) => {
            products.push({ ...doc.data(), id: doc.id });
          }
        );
        return this.getProductsImg(products).then((res: Product[]) => res);
      });
  }

  async getProducts(
    documentSnapshot: QuerySnapshot<Product>
  ): Promise<Product[]> {
    const products: Product[] = [];
    documentSnapshot.docs.forEach((doc: QueryDocumentSnapshot<Product>) => {
      products.push(doc.data());
    });
    return this.getProductsImg(products).then((res: Product[]) => res);
  }

  async getDocumentSnapshot(limit: number): Promise<QuerySnapshot<Product>> {
    return await this.productCollection.ref
      .limit(limit)
      .get()
      .then((doc: QuerySnapshot<Product>) => doc);
  }

  async getNextDocumentSnapshot(
    limit: number,
    documentSnapshots: QuerySnapshot<Product>
  ): Promise<QuerySnapshot<Product>> {
    return await this.productCollection.ref
      .startAt(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      .limit(limit)
      .get()
      .then((doc: QuerySnapshot<Product>) => doc);
  }

  async createProduct(product: Product): Promise<DocumentReference<Product>> {
    return await this.productCollection
      .add(product)
      .then((doc: DocumentReference<Product>) => doc);
  }

  async updateProduct(productId: string, product: Product): Promise<void> {
    return await this.productCollection.doc(productId).update(product);
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

  private async getProductsImg(products: Product[]): Promise<Product[] | void> {
    const _products: Product[] = [];
    return await new Promise((resolve) => {
      products.forEach((product) => {
        firebase.default
          .storage()
          .ref()
          .child('products/' + product.img)
          .getDownloadURL()
          .then((url: string) => {
            _products.push({ ...product, img: url });
            if (_products.length === products.length) {
              resolve(_products);
            }
          });
      });
    });
  }
}
