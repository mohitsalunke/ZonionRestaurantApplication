import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  restaurant: Restaurant[]=[]

  constructor(private route:Router, private sObj:RestaurantService) { }

  ngOnInit(): void {

    this.reloadData();
    console.log("im in init of home component")

      
    
  }

  reloadData() {
    this.sObj.getRestaurantList().subscribe(result=>{
      console.log(result);
      this.restaurant=result
      console.log(this.restaurant);
    });
    
  }

  restaurantDetails(id: number){
    this.route.navigate(['details', id]);
  }

}
