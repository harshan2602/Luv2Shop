import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService){}

}  
  
  


