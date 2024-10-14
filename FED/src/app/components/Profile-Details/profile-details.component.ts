import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit{
  email : any;
  constructor(public loginService: LoginService, private notificationService :NotificationService){}
  ngOnInit(): void{

    this.email = this.loginService.profileDetails.email
  }

  updateProfile(){
  var filter =this.email;
  var update = this.getBody();
  var body = {
    filter: filter,
    updateData : this.loginService.isAdmin || this.loginService.isDeliveryExec ? update : null,
    updateCustomer: this.loginService.isCustomer ? update : null,
    role: this.loginService.isAdmin ? "Admins": this.loginService.isDeliveryExec ? "DeliveryExecutives" : "Customers"
  }
  this.loginService.updateDetailsByEmail(body).subscribe((res)=>{
    if(res){
      this.notificationService.messageshow.next('Details Updated Successfully.');
    }
  })
  
  }


  getBody(){
    if(this.loginService.isCustomer){
      return {
        name: this.loginService.profileDetails.name,
        email : this.loginService.profileDetails.email,
        password: this.loginService.profileDetails.password,
        phoneNumber: this.loginService.profileDetails.phoneNumber   
      }
    }
    else{
      return  {
        name: this.loginService.profileDetails.name,
        email : this.loginService.profileDetails.email,
        password: this.loginService.profileDetails.password,
        phoneNumber: this.loginService.profileDetails.phoneNumber,
        accountNumber : this.loginService.profileDetails.accountNumber,
        nameOnCard: this.loginService.profileDetails.nameOnCard,
        routingNumber : this.loginService.profileDetails.routingNumber
      }
      
      

    }

  }
  
}
