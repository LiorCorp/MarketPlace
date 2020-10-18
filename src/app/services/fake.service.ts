import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class FakeService {

    constructor(private http: HttpClient) { }

    getMenu(): Observable<Menu[]> {
        return this.http.get('../../assets/json/menu.json') as Observable<Menu[]>;
    }

    getProducts(): Observable<Product[]> {
        return this.http.get('../../assets/json/product.json') as Observable<Product[]>;
    }
}
