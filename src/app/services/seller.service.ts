import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Seller } from './../models/seller.model';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  sellerCollection: AngularFirestoreCollection<Seller> = this.firestore.collection(
    'Seller'
  );

  constructor(private firestore: AngularFirestore) {}

  createSeller(seller: Seller): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sellerCollection.add(seller).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      );
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

  getSellerByIdOld(sellerId: string): Observable<Seller> {
    return this.sellerCollection
      .doc(sellerId)
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        map((seller: Seller) => {
          return seller;
        })
      );
  }

  getSellerById(sellerId: string): Observable<Seller> {
    return this.sellerCollection.doc(sellerId).valueChanges({ idField: 'id' });
  }
}
