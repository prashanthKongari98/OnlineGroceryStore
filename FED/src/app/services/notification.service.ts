import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public message: string | null = null;
  public messageshow: Subject<string> = new Subject<string>();


  getMessage(): Observable<string> {
    return this.messageshow.asObservable();
  }
}
