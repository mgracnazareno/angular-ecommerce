import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  // private paymentIntentUrl = environment.botanicalshopApiUrl  + ' /checkout/payment-IntersectionObserver'
  constructor(private httpClient: HttpClient,
    ) { }

  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }



}
