import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  id:number=0;
  restaurant:any;

  constructor(private activate:ActivatedRoute,private router:Router, private sObj:RestaurantService) { }

  ngOnInit(): void {

    this.restaurant= new Restaurant();
    this.id=this.activate.snapshot.params['id'];
    this.sObj.getRestaurantDetails(this.id).subscribe(data => {console.log(data)
      this.restaurant=data;

    },
    error => console.log(error)
    )
    
  }

  updateRestaurant()
  {
    this.sObj.editRestaurant(this.id,this.restaurant).subscribe(data =>{console.log(data);
    
  
    this.gotoList();
    },
    error =>console.log(error)
    )
    
    
  }

  gotoList() {
    this.router.navigate(['/view']);
  }

}
