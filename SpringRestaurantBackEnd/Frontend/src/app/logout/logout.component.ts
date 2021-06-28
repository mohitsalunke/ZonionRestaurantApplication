import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private valid:ValidationService, private r:Router) { }

  ngOnInit(): void {

    this.valid.logOut()
    this.r.navigate(['login']);
  }

}
