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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ActionButtonsComponent } from './header/action-buttons/action-buttons.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { SearchbarComponent } from './header/searchbar/searchbar.component';
import { HomeComponent } from './home/home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FiltersComponent } from './products-list/filters/filters.component';
import { ProductsCardComponent } from './products-list/products-card/products-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HamburgerIconComponent } from './ui/hamburger-icon/hamburger-icon.component';
import { HomeCardComponent } from './ui/home-card/home-card.component';
import { SigninComponent } from './ui/signin/signin.component';
import { SignupComponent } from './ui/signup/signup.component';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsListComponent,
    HamburgerIconComponent,
    FiltersComponent,
    ProductsCardComponent,
    MainMenuComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    SearchbarComponent,
    ActionButtonsComponent,
    MenuComponent,
    AuthComponent,
    SnackbarComponent,
    ProductDetailComponent,
    HomeCardComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
