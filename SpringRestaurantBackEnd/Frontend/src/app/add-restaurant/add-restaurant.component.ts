import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  
  value:any;
  message:string="";
  selectedFile:any;
 
  responseRest:any;
  restaurant:Restaurant[]=[];
  Restaurant={

    name:"",
    address:"",
    phone:"",
    opentime:"",
    closetime:"",
    isActivated:false

  }


  constructor(private sObj:RestaurantService, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  addForm(fvalue:any)
  {
    

    this.sObj.addUser(fvalue).subscribe(
      data =>{console.log("respose received"+data);
      alert("Restaurant Added Successfully");
      this.responseRest=data;
      },
      error => {console.log("Exception occured");
      alert("Restaurant not added");

    }
    )
      this.value=fvalue;
      console.log(fvalue)
  }

  addRestaurantMenuImage()
  {

    console.log("In onUpload " + this.selectedFile + "selected rest id :" + this.responseRest.id);
    this.sObj.uploadMenuImageService(this.selectedFile, this.responseRest.id).subscribe((resp: any) => {
      if (resp.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    }
    );
  }

  public imageChange(selectedFile: any) {
    this.selectedFile = selectedFile;
  }

  

}
