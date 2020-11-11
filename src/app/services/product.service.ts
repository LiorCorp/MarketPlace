import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productCollection: AngularFirestoreCollection<
    Product
  > = this.firestore.collection('Product');

  constructor(private firestore: AngularFirestore) {}

  createProduct(product: Product): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productCollection.add(product).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      );
      resolve();
    });
  }

  updateProduct(productId: string, product: Product): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productCollection
        .doc(productId)
        .update(product)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  getProductById(productId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productCollection.doc(productId).get();
    });
  }
}
