import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileDetailsComponent } from './components/Profile-Details/profile-details.component';
import { DeliveryExecutivesComponent } from './delivery-executives/delivery-executives.component';

const routes: Routes = [
  {path:'' ,component:LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profileDetails', component: ProfileDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'deliveryExecutives', component: DeliveryExecutivesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
