import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeGuard } from './home/guard/home.guard';
import { HomeComponent } from './home/home.component';
import { ProductsListGuard } from './products-list/guard/products-list.guard';
import { ProductDetailGuard } from './products-list/product-detail/guard/product-detail.guard';
import { ProductDetailComponent } from './products-list/product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [HomeGuard] },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [ProductsListGuard],
  },
  {
    path: 'product/:name/:id',
    component: ProductDetailComponent,
    canActivate: [ProductDetailGuard],
  },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
