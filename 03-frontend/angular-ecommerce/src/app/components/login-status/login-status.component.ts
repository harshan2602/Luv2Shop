import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent {

  storage: Storage = sessionStorage;

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService){}

  ngOnInit(): void {
    // Subscribe to the isAuthenticated$ Observable
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        // User is authenticated, retrieve the user's email from authentication response
        this.auth.user$.subscribe((res: any) => {
          const theEmail = res.email;
          // Now store the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        });
      }
    });
  }
}

