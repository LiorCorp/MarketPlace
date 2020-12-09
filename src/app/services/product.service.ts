import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Product> = this.firestore.collection(
    'Product'
  );

  constructor(private firestore: AngularFirestore) {}

  async getHomeProducts(): Promise<Product[]> {
    const products: Product[] = [];
    const first = this.productCollection.ref.limit(6);
    return await first
      .get()
      .then(
        (
          documentSnapshots: firebase.default.firestore.QuerySnapshot<Product>
        ) => {
          documentSnapshots.docs.forEach(
            (
              doc: firebase.default.firestore.QueryDocumentSnapshot<Product>
            ) => {
              products.push(doc.data());
            }
          );
          return this.getProductsImg(products).then((res: Product[]) => res);
          // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
          // const next = this.productCollection.ref.startAfter(lastVisible).limit(6);
        }
      );
  }

  async createProduct(product: Product): Promise<DocumentReference<Product>> {
    return await this.productCollection
      .add(product)
      .then((doc: DocumentReference<Product>) => doc);
  }

  async updateProduct(productId: string, product: Product): Promise<void> {
    return await this.productCollection.doc(productId).update(product);
  }

  private async getProductsImg(products: Product[]): Promise<Product[] | void> {
    const _products: Product[] = [];
    return await new Promise((resolve) => {
      products.forEach((product) => {
        firebase.default
          .storage()
          .ref()
          .child('products/' + product.productImg)
          .getDownloadURL()
          .then((url) => {
            _products.push({ ...product, productImg: url });
            if (_products.length === products.length) {
              resolve(_products);
            }
          });
      });
    });
  }
}
