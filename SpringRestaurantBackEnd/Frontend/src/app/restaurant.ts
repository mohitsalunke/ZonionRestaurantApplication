import { Time } from "@angular/common";

export class Restaurant{
    id:number;
    name:String;
    address:String;
    phone:string;
    opentime:any;
    closetime:any;
    imagename:string;
    isactivated:boolean;
    lastupdatedtime:string;

    constructor()
    {
        this.id=0;
        this.name="";
        this.address="";
        this.phone="";
        this.opentime="";
        this.closetime="";
        this.imagename="";
        this.isactivated=false;
        this.lastupdatedtime="";
    }
}