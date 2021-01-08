import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/fr';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SigninFormComponent } from './auth/signin-form/signin-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { CartComponent } from './cart/cart.component';
import { OverviewCartComponent } from './cart/overview-cart/overview-cart.component';
import { ProductCardCartComponent } from './cart/product-card-cart/product-card-cart.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProductActionComponent } from './products-list/product-detail/product-action/product-action.component';
import { ProductDetailComponent } from './products-list/product-detail/product-detail.component';
import { ProductOverviewComponent } from './products-list/product-detail/product-overview/product-overview.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { BubbleMenuComponent } from './ui/bubble-menu/bubble-menu.component';
import { FilterComponent } from './ui/filter/filter.component';
import { HamburgerIconComponent } from './ui/hamburger-icon/hamburger-icon.component';
import { HeaderButtonsComponent } from './ui/header/header-buttons/header-buttons.component';
import { HeaderCategoriesComponent } from './ui/header/header-categories/header-categories.component';
import { SearchbarComponent } from './ui/header/searchbar/searchbar.component';
import { HomeCardComponent } from './ui/home-card/home-card.component';
import { ProductsCardComponent } from './ui/products-card/products-card.component';
import { RatingComponent } from './ui/rating/rating.component';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsListComponent,
    HamburgerIconComponent,
    MainMenuComponent,
    HomeComponent,
    SearchbarComponent,
    AuthComponent,
    SnackbarComponent,
    ProductDetailComponent,
    HomeCardComponent,
    HeaderButtonsComponent,
    BubbleMenuComponent,
    HeaderCategoriesComponent,
    RatingComponent,
    ProductsCardComponent,
    FilterComponent,
    SigninFormComponent,
    SignupFormComponent,
    ResetPasswordComponent,
    ProductOverviewComponent,
    ProductActionComponent,
    CartComponent,
    ProductCardCartComponent,
    OverviewCartComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatTreeModule,
    NgxSliderModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatPasswordStrengthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
