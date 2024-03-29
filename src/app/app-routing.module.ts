import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, 
  OktaAuthGuard
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';

const oktaConfig = myAppConfig.oidc;

function sentToLoginPage(oktaAuth: OktaAuth, injector:Injector){
  //use injector to access any service available within your application
  const router = injector.get(Router);
  //redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: 'order-history', component: OrderHistoryComponent, canActivate:[OktaAuthGuard],
                    data: {onAuthRequired: sentToLoginPage}},
  { path: 'members', component: MembersPageComponent, canActivate:[OktaAuthGuard],
                    data: {onAuthRequired: sentToLoginPage}},
  { path: 'login/callback', component: OktaCallbackComponent},
  { path: 'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'cart-details', component: CartDetailsComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'category/:id', component: ProductListComponent},
  { path: 'category', component: ProductListComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'acceuil', component: AcceuilComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: '**' , redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
