import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Seller } from './../models/seller.model';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  sellerCollection: AngularFirestoreCollection<
    Seller
  > = this.firestore.collection('Seller');

  constructor(private firestore: AngularFirestore) {}

  createSeller(seller: Seller): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sellerCollection.add(seller).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      );
      resolve();
    });
  }

  updateSeller(sellerId: string, seller: Seller): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sellerCollection
        .doc(sellerId)
        .update(seller)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  getSellerByUid(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sellerCollection.ref
        .where('uid', '==', uid)
        .get()
        .then(
          (res) => {
            if (!res.empty) {
              resolve(res.docs[0].data());
            }
          },
          (err) => reject(err)
        );
    });
  }
}
