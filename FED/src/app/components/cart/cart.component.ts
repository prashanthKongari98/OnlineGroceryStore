import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems : any =[];
 
  constructor(public cartService: CartService, private loginService: LoginService, private notificationService: NotificationService){}

  ngOnInit(): void{
    this.cartService.showPaymentSection = false;
    this.getCartDetails();
  }

  getCartDetails(){
    this.cartService.getCartItemsByEmail(this.loginService.profileDetails.email).subscribe((res)=>{
      if(res){
        this.cartItems = res;
        this.cartItems.forEach((item: any)=>{

          item.total = item.quantity * Number(item.price_Per_Each.split('/')[0].split('$')[1]);
        })

        this.cartService.cartItems = this.cartItems;
      }
    })
  }

  buyNow(){
    this.cartService.showPaymentSection = true;
  }

  remove(item : any){
    var cartItemId = item._id;
    this.cartService.removeItemFromCart(cartItemId).subscribe((res)=>{
      if(res){
        this.notificationService.messageshow.next('Item removed from Cart.');
        this.getCartDetails();
      }
    })
  }

  updateCartItem(item: any){
    var cartItemId = item._id;
    var quantity = item.quantity;
    this.cartService.updateItemFromCart(cartItemId, quantity).subscribe((res)=>{
      if(res){
        this.notificationService.messageshow.next('Item Updated from Cart.');
        this.getCartDetails();
      }
    })
  }

  updateTotal(item: any){
    item.total = item.quantity * Number(item.price_Per_Each.split('/')[0].split('$')[1]);
  }

  OnRadioBtnChange(event: any){
    this.cartService.selectedDeliveryOption  = event.target.value == "StorePickup" ?   "Store Pickup":"By Executive" ;
  }


  // cartItems = [
  //   {
  //     title: 'Item 1',
  //     price: 50,
  //     deliveryTime: '3 days',
  //     showDetails: false
  //   },
  //   {
  //     title: 'Item 2',
  //     price: 30.5,
  //     deliveryTime: '2 days',
  //     showDetails: false
  //   },
  //   // Add more items here
  // ];

  toggleItemDetails(item : any) {
    item.showDetails = !item.showDetails;
  }
}
