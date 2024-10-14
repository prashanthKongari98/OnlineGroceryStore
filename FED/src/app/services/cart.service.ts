import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseurl = "https://localhost:7274";
  showPaymentSection: boolean = false;
  addressDetails: any = {
    addressLine1: null,
    addressLine2: null,
    zip:null,
    state: null,
    city: null

  } ;
  cartItems: any =[];
  deliveryOptions: any =  ["Store Pickup", "By Executive"];
  selectedDeliveryOption: any;
  constructor(private httpClient: HttpClient) { }

  getCartItemsByEmail(email: any): Observable<any>{
    return this.httpClient.get(this.baseurl + '/api/Orders/getCart?UserEmail=' + email);
  }

  removeItemFromCart(cartItemId : any): Observable<any>{
    return this.httpClient.post(this.baseurl + '/api/UserDetails/removeFromCart?id=' + cartItemId, null);
  }

  buyCartItems(cartItems: any, emailId: any): Observable<any>{
    return this.httpClient.post(this.baseurl + '' + emailId , cartItems);
  }

  updateItemFromCart(cartItemId : any, quantity: any): Observable<any>{
    return this.httpClient.post(this.baseurl + '/api/Update/updateCart?id=' +cartItemId + "&quantity=" + quantity, null);
  }
}
