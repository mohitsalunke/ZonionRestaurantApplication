import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
   
  imagePath: any;
  fileURL = "http://localhost:8080/Api/get"; 
  id:number=0;
  //imagename:string="";

  restaurant:Restaurant | any;

  constructor(private active:ActivatedRoute, private route:Router, private sObj:RestaurantService) { }

  ngOnInit(): void {

    this.restaurant= new Restaurant();
    this.id=this.active.snapshot.params['id'];
    this.sObj.getRestaurantDetails(this.id).subscribe(data =>{console.log(data)
      this.restaurant=data;
  
      this.imagePath = `${this.fileURL}/${this.restaurant.id}/${this.restaurant.imagename}`;
      console.log(this.imagePath);
      }, error => console.log(error)
      );
      
      
      

    
  }

  list()
  {
    this.route.navigate(['home']);
  }

}
