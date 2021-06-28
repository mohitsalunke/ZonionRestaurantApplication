import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url:string;
  imgUrl:string="";

  constructor(private http:HttpClient) {
    this.url='http://localhost:8080/Api/restaurants';
    this.imgUrl='http://localhost:8080/Api/upload';
   }

   public addUser(restaurant:any):Observable<any>{
    console.log("im in service save"+restaurant);
    return this.http.post<any>(`${this.url}`, restaurant);
  }

  public getRestaurantList(): Observable<any> {
    console.log("Im in service getrestautantList");
    return this.http.get(`${this.url}`);
  }

  public editRestaurant(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  public getRestaurantDetails(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  public deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  public updateIsActivated(id:number):Observable<any>{
     return this.http.get(`${this.url}/isActivated/${id}`);
  }

  uploadMenuImageService(file: any, id: number): any { /* Method to Upload the Menu */
    let target: DataTransfer = <DataTransfer>(file.target);
    let fileList: FileList = target.files;
    let Selectedfile: File = fileList[0];
    const formdata: FormData = new FormData();
    formdata.append('file', Selectedfile, Selectedfile.name);
    const req = new HttpRequest('PUT', `${this.imgUrl}/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }


}
