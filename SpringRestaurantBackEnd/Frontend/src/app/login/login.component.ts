import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username = ''
  password = ''
  // invalidLogin = false
  
  constructor(private valid:ValidationService, private router:Router) { }

  ngOnInit(): void {
  }

  login()
  {
      if (this.valid.authenticate(this.username, this.password)
        ) {
          this.router.navigate(['view'])
          // this.invalidLogin = false
          alert("Log-in Successfull");
        } //else
          // this.invalidLogin = true
          
      
  }
  
  

}
