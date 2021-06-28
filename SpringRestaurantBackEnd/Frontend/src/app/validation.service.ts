import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  authenticate(username:string, password:string) {
    if (username === "Mohit" && password === "password") {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      alert("Invalid - Credentials");
      return false;
      
    }
  }

  isAdminActive() {
    let admin = sessionStorage.getItem('username')
    return !(admin === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
