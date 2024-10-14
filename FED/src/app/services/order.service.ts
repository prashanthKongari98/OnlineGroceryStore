import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseurl = "https://localhost:7274";
  constructor(private httpClient : HttpClient) { }

  getOrdersByEmailId(emailId: any): Observable<any>{
    return this.httpClient.get(this.baseurl + '/api/Orders/getAllCustomerOrders?customerId=' + emailId);
  }

  getOrders(): Observable<any>{
    return this.httpClient.get(this.baseurl + '/api/Orders/getAllOrders');
  }

  getDeliverables(emailId: any): Observable<any>{
    return this.httpClient.get(this.baseurl + '/api/get/ordersDeliverable?emailId =' + emailId);
  }

  getDeliveredOrdersList(emailId: any): Observable<any>{
    return this.httpClient.get(this.baseurl + '/api/get/getDeliveredOrdersList?emailId =' + emailId);
  }

  updateOrderStatus(reqBody: any): Observable<any>{
    return this.httpClient.post(this.baseurl + '/api/Update/updateOrderStatus' ,reqBody  )
  }
}
