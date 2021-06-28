import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyGuardGuard } from './my-guard.guard';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"add",component:AddRestaurantComponent,canActivate:[MyGuardGuard]},
  {path:"edit/:id",component:EditRestaurantComponent,canActivate:[MyGuardGuard]},
  {path:"details/:id",component:RestaurantDetailsComponent},
  {path:"view",component:ViewRestaurantComponent,canActivate:[MyGuardGuard]},
  {path:"logout",component:LogoutComponent,canActivate:[MyGuardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
