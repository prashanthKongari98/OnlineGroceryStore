import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = "https://localhost:7274";
  isAdmin : boolean =false;
  isCustomer: boolean = false;
  isDeliveryExec: boolean =false;
  isLoginSuccessful: boolean = false;
  isLoggedOutSuccessful: boolean = false;

  profileDetails: any;
  showDeliveryErrMsg: any;

  constructor(private http: HttpClient) {}

  public getDetailsByEmail(emailId: any): Observable<any>{
    return this.http.get(this.baseurl + "/api/UserDetails/get?UserEmail=" +emailId );
  } 

  public updateDetailsByEmail(reqBody: any): Observable<any>{
    return this.http.post(this.baseurl + "/api/Update/update" ,reqBody );
  }

}
