import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Brand } from './../models/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  brandCollection: AngularFirestoreCollection<Brand> = this.firestore.collection(
    'Brand'
  );

  constructor(private firestore: AngularFirestore) {}

  createBrand(brand: Brand): Promise<any> {
    return new Promise((resolve, reject) => {
      this.brandCollection.add(brand).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      );
    });
  }

  updateBrand(brandId: string, brand: Brand): Promise<any> {
    return new Promise((resolve, reject) => {
      this.brandCollection
        .doc(brandId)
        .update(brand)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  getBrandByIdOld(brandId: string): Observable<Brand> {
    return this.brandCollection
      .doc(brandId)
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        map((brand: Brand) => {
          return brand;
        })
      );
  }

  getBandById(brandId: string): Observable<Brand> {
    return this.brandCollection.doc(brandId).valueChanges({ idField: 'id' });
  }
}
