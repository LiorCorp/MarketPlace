import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { FetchAllProducts } from 'src/app/store/app-state/app.actions';
import { AppState } from 'src/app/store/app-state/app.state';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const products: Product[] = this.store.selectSnapshot(AppState.products);
    if (products.length === 0) {
      this.store.dispatch(FetchAllProducts);
    }
    return true;
  }
}
