
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { JwtService } from './jwt-service.service';

@Injectable({
  providedIn: 'root',
})

////Name   Date       Comments
////duypn  1/3/2024  create
export class AuthService {
  // Define HttpHeaders with 'Content-Type' set to 'application/json'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // Inject the HttpClient service into the constructor
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {}

  // Method to handle user login
  login(username: string, password: string): Observable<any> {
    // Construct the login URL with provided username and password
    const loginUrl = `https://10.1.20.121:12345/api/Authentication/login?username=${username}&password=${password}`;

    // Send a POST request to the login URL with the HttpHeaders
    return this.http.post<any>(loginUrl, { headers: this.headers });
  }

  //Method to handle logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  //Method to check authentication status
  checkAuth(token: string | null): void {
    if (token) {
      // Decode the token (you may need to use a library for this)
      // For simplicity, let's assume a function decodeToken exists
      const decodedToken = this.jwtService.decodeToken(token);

      if (decodedToken) {
        // Token is valid, navigate to the home page
        if (
          Number(
            decodedToken[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ]
          ) == 1
        ) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        // Invalid token, navigate to the login page
        this.router.navigate(['/login']);
      }
    } else {
      // No token, navigate to the login page
      this.router.navigate(['/login']);
    }
  }

 //Handel check the password and confirm password are same
 passwordMatchValidator: (form: FormGroup) => ValidationErrors | null = (form) => {
  const passWord = form.get('passWord')?.value;
  const confirmPassWord = form.get('confirmPassWord')?.value;

  return passWord === confirmPassWord ? null : { mismatch: true };
}

  
}