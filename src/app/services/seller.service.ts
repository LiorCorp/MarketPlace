import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getSellerById(sellerId: string): Observable<Seller> {
    return this.sellerCollection
      .doc(sellerId)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((seller: Seller) => {
          return seller;
        })
      );
  }

  getAllSeller(): Observable<QuerySnapshot<Seller>> {
    return this.sellerCollection.get();
  }
}
