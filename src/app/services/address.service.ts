import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private firestore: AngularFirestore) { }

  createAddress(address: Address): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        this.firestore.collection('Address').add(address)
          .then(res => resolve(res.id), err => reject(err));
      }
    );
  }

  updateAddress(address: AngularFirestoreCollection<Address>) {
    return this.firestore
      .collection('Address')
      .doc(address.ref.id)
      .set({ completed: true }, { merge: true });
  }

  getAddressUser(addressId: string) {
    return this.firestore.collection('Address').doc(addressId).get();
  }
}
