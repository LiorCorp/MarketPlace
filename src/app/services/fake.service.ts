import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class FakeService {
  constructor(private http: HttpClient) {}

  getMenu(): Observable<Category[]> {
    return this.http.get('../../assets/json/menu.json') as Observable<
      Category[]
    >;
  }

  getProducts(): Observable<any[]> {
    return this.http.get('../../assets/json/product.json') as Observable<any[]>;
  }
}
