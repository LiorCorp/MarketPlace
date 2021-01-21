import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state/app.state';
import { Product } from '../../models/Product.model';
import { FetchProducts } from './../../store/app-state/app.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsListGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const products: Product[] = this.store.selectSnapshot(AppState.products);
    if (!products) {
      this.store.dispatch(FetchProducts);
    }
    return true;
  }
}
