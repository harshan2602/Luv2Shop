import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginStatusComponent } from './components/login-status/login-status.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { AuthModule, AuthHttpInterceptor, AuthGuard } from '@auth0/auth0-angular';
import { LoadingComponent } from './components/loading/loading.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const routes: Routes = [
  {path:'order-history', component:OrderHistoryComponent, canActivate: [AuthGuard]},
  {path: 'members', component: MembersPageComponent, canActivate: [AuthGuard]},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  { path: 'products/:id',component:ProductDetailsComponent },
  { path: 'search/:keyword',component:ProductListComponent },
  { path: 'category/:id',component:ProductListComponent },
  { path: 'category',component:ProductListComponent },
  { path: 'products',component:ProductListComponent },
  { path: '', redirectTo:'/products',pathMatch:'full' },
  { path: '**', redirectTo:'/products',pathMatch:'full' }
];
//  ** is wildcard, it will match on anything that didn't match above routes
/*ORDER OF ROUTES IS IMPORTANT.FIRST MATCH WINS 
START FROM MOST SPECFIC TO GENERIC
 */

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
  
    LoginStatusComponent,
    MembersPageComponent,
    LoadingComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'luv2shop.us.auth0.com',
      clientId: 'yf72wXeoxuJZdynTqwcPVSJhBFPfvacV',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience : 'https://gatekeeper/api/orders/**'
      },
      httpInterceptor: {
        allowedList: [{
          uri:'http://localhost:8080/api/orders/*',
          tokenOptions: {
            authorizationParams: {
              // The attached token should target this audience
              audience: 'https://gatekeeper/api/orders/**',
            }
          }
        }]
      },
    }),
  ],
  providers: [ProductService,{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
