import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent implements OnInit {

  
  restaurant: Restaurant[]=[];
  Deactivate:boolean | any;

  searchlist:any; //varaible for searching by name 
  p: number = 1; //varaible of pagination

  constructor(private route:Router,private sObj:RestaurantService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.sObj.getRestaurantList().subscribe(result=>{this.restaurant=result});
  }

  deleteRestaurant(id: number) {
    this.sObj.deleteRestaurant(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  restaurantDetails(id: number){
    this.route.navigate(['details', id]);
  }

  editRestaurant(id: number){
    this.route.navigate(['edit', id]);
  }

  ChangeButton(id:number)
  {
    this.sObj.updateIsActivated(id).subscribe(data => {
      console.log(data);
      this.Deactivate=data.isactivated;
    },
      error =>console.log(error)
      
      )
  }

  // search()
  // {
  //   if(this.name == "")
  //   {
  //     this.ngOnInit();
  //   }
  //   else{
  //     this.restaurant=this.restaurant.filter(res =>{
  //       return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
  //     })
  //   }
  // }


}
