import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(public cartService: CartService, private paymentService: PaymentsService, private loginService: LoginService, private router : Router){}
  @Input() cartItems: any ;
  cardNumber: any;
  cardHolderName: any;
  isDateValid: boolean = true;
  isFutureDate: boolean = true;
  cvv: any;
  isMonthValid: boolean = true;
  isCvvValid: boolean = true;
  expireDate: any;
  cardName: any;
  accountNumber: any;
  selectedPaymentMethod: any;
  billingAddress: any;
  isCardNumberValid: boolean = true;
   



  ngOnInit(): void {
    this.resetFields();
  }


  resetFields(){
   
    this.accountNumber = null;
    this.cvv = null;
    this.selectedPaymentMethod = null;
    this.billingAddress = null;
    this.cardHolderName = null;
  }

  cardNumberValidation(): boolean {
    return this.accountNumber != null && this.accountNumber != ""? /^\d{16}$/.test(this.accountNumber) : true; 
  }

  securityCodeValidation(): boolean {
    return this.cvv != null && this.cvv != ""? /^\d{3}$/.test(this.cvv) : true; 
  }
  onSubmit(){
    var total = 0;
    this.cartService.cartItems.forEach((p: any)=>{
      total = total + p.total;
    })
    var reqBody = {
  
      orderDetails :{
        deliveryAddress :this.cartService.selectedDeliveryOption == 'Store Pickup' ? null:  JSON.stringify(this.cartService.addressDetails) ,
        customerId : this.loginService.profileDetails._id,
        orderStatus:"Order Confirmed",
        deliveryType: this.cartService.selectedDeliveryOption
      },
      cartDetails: this.cartService.cartItems,
      paymentDetails:{
        cardNumber         : this.accountNumber.toString()          ,
        cvv                   : this.cvv.toString()                   ,
        paymentMethod : this.selectedPaymentMethod ,
        billingAddress        : this.billingAddress        ,
        cardHolderName        : this.cardHolderName        ,
        customerName: this.loginService.profileDetails.name,
        customerId: this.loginService.profileDetails._id,
        orderId: null,
        amount: "$" + total,
        expiryDate: this.expireDate
      }
    }
    

    this.paymentService.placeOrder(reqBody, this.loginService.profileDetails.email).subscribe((res) =>{
      this.router.navigateByUrl('/orders');
      this.cartService.addressDetails= {
        addressLine1: null,
        addressLine2: null,
        zip:null,
        state: null,
        city: null
    
      } ;
    })
    this.cartService.selectedDeliveryOption = null;
  }

  onCancel(){
    this.cartService.showPaymentSection = false;
  }

  validateCvv(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const cvvPattern = /^[0-9]{3,4}$/;
    this.isCvvValid = cvvPattern.test(inputValue);
}

validateExpiryDate(event: Event) {
  if((event.target as HTMLInputElement).value != null){
    const inputValue = (event.target as HTMLInputElement).value;
    const datePattern = /^\d{2}\/\d{2}$/;
    this.isDateValid = datePattern.test(inputValue);

    if (this.isDateValid) {
        const currentDate = new Date();
        const inputDateParts = inputValue.split('/');
        const inputMonth = Number(inputDateParts[0]);
        const inputYear = Number(inputDateParts[1]);
        const inputDate = new Date(2000 + inputYear, inputMonth - 1, 1);

        this.isMonthValid = inputMonth >= 1 && inputMonth <= 12;
        this.isFutureDate = inputDate > currentDate;
    }
  }
  else{
    this.isMonthValid = true;
    this.isFutureDate  = true;
  }
}

validateCardNumber(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const cardNumberPattern = /^[0-9]{16}$/;
    this.isCardNumberValid = cardNumberPattern.test(inputValue);
}

}

