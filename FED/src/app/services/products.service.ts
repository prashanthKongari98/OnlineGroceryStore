import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseurl = "https://localhost:7274";
  constructor(private httpClient : HttpClient) { }


  addProduct(reqBody: any ){
   return this.httpClient.post(this.baseurl + '/api/Orders/addProduct', reqBody);
  }

  editProduct(reqBody: any): Observable<any>{
    return this.httpClient.post(this.baseurl + '/api/Update/updateProducts', reqBody);
  }

  getProducts(): Observable<any>{
    return this.httpClient.get(this.baseurl + '/api/UserDetails/getAllProducts');
  }

  getCategories(): Observable<any>{
    return this.httpClient.get(this.baseurl + '/api/Orders/getAllCategories');
  }

  getProductsByCategories(category: any): Observable<any>{
    return this.httpClient.post(this.baseurl + '/api/Orders/getProductsByCategory',category);
  }

  addToCart(product: any): Observable<any>{
    return this.httpClient.post(this.baseurl + '/api/Orders/addToCart', product);
  }

  addCategory(reqBody: any ){
    return this.httpClient.post(this.baseurl + '/api/Orders/addCategory', reqBody);
   }
}
