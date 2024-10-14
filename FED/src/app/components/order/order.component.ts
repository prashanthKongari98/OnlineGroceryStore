import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: any = [];
  selectedDeliveryExecutiveName : any = null;
  selectedDeliveryExecutivePhoneNumber : any = null;
 deliveryExec : any = [];
  statuses: any =[
    {
      "_id": "656cd3901b8b5c744c31a6c0",
      "status": "Delivered"
    },
    {
      "_id": "656cd3901b8b5c744c31a6c1",
      "status": "Cancelled"
    },
    {
      "_id": "656cd3901b8b5c744c31a6c2",
      "status": "Return Approved"
    },
    {
      "_id": "656cd3901b8b5c744c31a6c3",
      "status": "Out for Delivery"
    },
    {
      "_id": "656cd3901b8b5c744c31a6c4",
      "status": "Return Initiated"
    },
    {
      "_id": "656cd3901b8b5c744c31a6c5",
      "status": "Return Approved"
    },
    {
      "_id": "656cd3901b8b5c744c31a6c6",
      "status": "Return Picked"
    },
    {
      "_id": "656cd3901b8b5c744c31a6c7",
      "status": "Ready for Pickup"
    }
  ];
  status: any;
  date: any =  new Date().getDate() + "/"+ new Date().getMonth() + "/"+ new Date().getFullYear();
  categories: any=[];
  constructor(public loginService : LoginService, private orderService: OrderService, private productService: ProductsService,
     private registerService: RegisterServiceService){}
  ngOnInit(): void {

    this.getCategories();
    this.getAllExecutives();
   
  }

  getDeliveryExecutives(){
    //this.productService.getD
  }

  getCategories(){
    this.productService.getCategories().subscribe((resProd)=>{
      this.categories = resProd;
      this.getOrders();
    });
  }

  onStatusChange(event: any){
    this.status = event.target.value;
  }

  onDeliveryExecChange(event: any){
    this.deliveryExec.forEach((exc: any)=>{
      if(exc._id == event.target.value){

        this.selectedDeliveryExecutiveName = exc.name;
        this.selectedDeliveryExecutivePhoneNumber = exc.phoneNumber;
      }
    })
    
  }

  getAllExecutives(){
    this.registerService.getExecutives().subscribe((res)=>{
      if(res){
        this.deliveryExec = res;
        
      }
    })
  }

  getOrders(){
    if(this.loginService.isAdmin){
      this.orderService.getOrders().subscribe((res)=>{
        if(res){
          this.orders = res;
          this.orders.forEach((order: any)=>{
            order.cartDetails.forEach((item: any)=>{
              item['isReturnInitiated'] = false;          
              item['isReturnable'] = this.categories.find((cat: any)=> cat.categoryName == item.category).isReturnable;
            })
          })
        }
      })
    }
    else if(this.loginService.isCustomer){
      this.orderService.getOrdersByEmailId(this.loginService.profileDetails._id).subscribe((res)=>{
        if(res){
          this.orders = res;
          this.orders.forEach((order: any)=>{
            order.cartDetails.forEach((item: any)=>{
              item['isReturnInitiated'] = false;          
              item['isReturnable'] = this.categories.find((cat: any)=> cat.categoryName == item.category).isReturnable;
            })
          })
        }
      })
    }
    else if(this.loginService.isDeliveryExec){
      this.orderService.getOrders().subscribe((res)=>{
        if(res){
          this.orders = res;
          this.orders.forEach((order: any)=>{
            order.cartDetails.forEach((item: any)=>{
              item['isReturnInitiated'] = false;          
              item['isReturnable'] = this.categories.find((cat: any)=> cat.categoryName == item.category).isReturnable;
            })
          })
        }
      })
    }
  }

  getOrderAddress(address: any){
   return  JSON.parse(address);
  }

  checkIsReturnAvaliable(order: any){
    var cartDetails= order.cartDetails.filter((cart: any)=> cart.isReturnable == "Yes");
    return cartDetails.length > 0 ? true : false;
  }


  updateCartItem(item: any, status: any = null){
    var body = {
      orderStatus:status == null ?  this.statuses.find((c: any)=> c._id == this.status).status : status ,
      orderId: item.orderId,
      selectedDeliveryExecutiveName : this.selectedDeliveryExecutiveName ? this.selectedDeliveryExecutiveName : item.selectedDeliveryExecutiveName ? item.selectedDeliveryExecutiveName : null,
      selectedDeliveryExecutivePhoneNumber : this.selectedDeliveryExecutivePhoneNumber ? this.selectedDeliveryExecutivePhoneNumber : item.selectedDeliveryExecutivePhoneNumber ? item.selectedDeliveryExecutivePhoneNumber:null
    }
   
    this.orderService.updateOrderStatus(body).subscribe((res)=>{
      this.getOrders();
      this.status = null;
    })
  }

  toggleOrderDetails(order: any) {
    order.showDetails = !order.showDetails;
  }

  getAmount(item: any){
    return item.quantity * Number(item.price_Per_Each.split('/')[0].split('$')[1])
  }


  checkIsStatusFieldNeeded(order: any){
    if(this.loginService.isAdmin){
      return order.orderDetails.orderStatus == 'Order Confirmed';
    }
    else{
      return order.orderDetails.orderStatus == 'Out for Delivery';
    }
  }
}
