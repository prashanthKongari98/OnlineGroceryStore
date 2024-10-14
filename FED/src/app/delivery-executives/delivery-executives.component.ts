import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../services/register-service.service';

@Component({
  selector: 'app-delivery-executives',
  templateUrl: './delivery-executives.component.html',
  styleUrls: ['./delivery-executives.component.scss']
})
export class DeliveryExecutivesComponent implements OnInit {


  deliveryExecutives : any = [];

  constructor(private registerService: RegisterServiceService){}

  ngOnInit(): void {

    this.getAllExecutives();
   
  }

  updateDetails(exec: any, status: any){
    this.registerService.updateExecutives(exec.email,status).subscribe((res)=>{
      this.getAllExecutives();
    })
  }

  getAllExecutives(){
    this.registerService.getExecutives().subscribe((res)=>{
      if(res){
        this.deliveryExecutives = res;
        
      }
    })
  }
}
