import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  baseurl = "https://localhost:7274"
  constructor(private http: HttpClient) {}

  public addCustomer(data: any): Observable<any>{
    return this.http.post(this.baseurl + "/api/Register/newUser/customer", data);
  } 

  public addDeliveryExec(data: any): Observable<any>{
    return this.http.post(this.baseurl + "/api/Register/newUser/deliveryExec", data);
  } 

  public getExecutives(): Observable<any>{
    return this.http.get(this.baseurl + "/api/Register/getAllExecutives");
  } 

  public updateExecutives(executiveEmail: any , status: any): Observable<any>{
    return this.http.post(this.baseurl + "/api/Register/approveExecutive?executiveEmail=" + executiveEmail + "&approve="+ status, null);
  } 
}

