import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as firebase from 'firebase';
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
import { FiltersComponent } from './products-list/filters/filters.component';
import { ProductsCardComponent } from './products-list/products-card/products-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HamburgerIconComponent } from './ui/hamburger-icon/hamburger-icon.component';
import { SigninComponent } from './ui/signin/signin.component';
import { SignupComponent } from './ui/signup/signup.component';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

firebase.default.initializeApp(environment.firebaseConfig);

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
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,

    AngularFirestoreModule,
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
    MatPasswordStrengthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
