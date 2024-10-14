import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-msg',
  template: `
    <div *ngIf="message" class="notification">
      {{ message }}
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      top: 86px;
      right: 20px;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border-radius: 5px;
    }
  `]
})
export class NotificationMsgComponent implements OnInit {
  constructor(public notificationService: NotificationService, private router: Router) { }
  public message: any ;
  public previousmsg : any;
  public loginMsgs = ["Incorrect password, please enter correct password and try again."
  ,"User Not found, Please Register", "Registration Successful!","Details Updated Successfully."];

  ngOnInit(): void {
    this.notificationService.messageshow.subscribe((res)=>{
      if(res != null){
        this.assignMessage(res);
        this.previousmsg = res;
        setTimeout(() => {
          this.assignMessage(null);
          if(this.loginMsgs.findIndex(this.previousmsg) != -1) this.router.navigateByUrl('/login') ;
        }, 5000);
      }
    })
  }

  assignMessage(msg : any) {
    this.message =  msg;
  }
}
