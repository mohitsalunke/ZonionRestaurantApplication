import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { LogoutComponent } from './logout/logout.component';
import { MyGuardGuard } from './my-guard.guard';
import { HeaderComponent } from './header/header.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { RestaurantService } from './restaurant.service';
import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import {MatIconModule} from '@angular/material/icon';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HomeComponent } from './home/home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    LogoutComponent,
         HeaderComponent,
         AddRestaurantComponent,
         ViewRestaurantComponent,
         EditRestaurantComponent,
         HomeComponent,
         RestaurantDetailsComponent
         
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule

  ],
  providers: [MyGuardGuard,RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
