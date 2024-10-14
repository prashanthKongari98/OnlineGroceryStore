import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ProfileDetailsComponent } from './components/Profile-Details/profile-details.component';
import { RegisterServiceService } from './services/register-service.service';
import { NotificationService } from './services/notification.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationMsgComponent } from './components/notification-msg/notification-msg.component';
import { DeliverablesComponent } from './components/deliverables/deliverables.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DeliveryExecutivesComponent } from './delivery-executives/delivery-executives.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OrderComponent,
    ProfileDetailsComponent,
    CartComponent,
    RegisterComponent,
    NotificationMsgComponent,
    DeliverablesComponent,
    PaymentsComponent,
    DeliveryExecutivesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RegisterServiceService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
