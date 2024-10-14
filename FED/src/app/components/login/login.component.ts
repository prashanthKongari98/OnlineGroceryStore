import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public loginService: LoginService, private notificationService: NotificationService, private router: Router){}
  email: any;
  password: any;
  onLogin(){
    this.loginService.showDeliveryErrMsg = false;
    this.loginService.getDetailsByEmail(this.email).subscribe((res : any)=>{
      if(res && res.error != null){
        this.resetFields();
        this.notificationService.messageshow.next("User Not found, Please Register");
      }
      else{
        var data = res;
        this.loginService.profileDetails = res;
        this.loginService.isAdmin = res.isAdmin;
        this.loginService.isDeliveryExec = res.isDeliveryExec;
        this.loginService.isCustomer = res.isCustomer;

        if(data.password == this.password){
          this.loginService.isLoginSuccessful= true;
          if(this.loginService.isDeliveryExec){
            this.loginService.showDeliveryErrMsg = this.loginService.profileDetails.isApprovedByAdmin == 0 ;
            if(this.loginService.profileDetails.isApprovedByAdmin == 0) this.resetFields();
            this.loginService.profileDetails.isApprovedByAdmin == 1 ? this.router.navigateByUrl('/orders') : this.router.navigateByUrl('/login');
          }
          else{ this.router.navigateByUrl('/home'); }
        }
        else if(data.password !== this.password){
          this.resetFields();
          this.notificationService.messageshow.next("Incorrect password, please enter correct password and try again.");
        }

      }

    })
  }

  resetFields(){
    this.email = null;
    this.password = null;
  }

}
