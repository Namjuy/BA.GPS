import { LoginRequest } from './../models/loginRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
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
    const loginUrl = `http://localhost:5159/AuthenApi/login`;
    return this.http.post(
      loginUrl,
      { username, password },
      { responseType: 'text' }
    );
  }

  //Method to handle logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  //Method to check authentication status
  checkAuth(): void {
    var token = localStorage.getItem('jwtToken');
  
    if (token) {
      // Decode the token (you may need to use a library for this)
      // For simplicity, let's assume a function decodeToken exists
      const decodedToken = this.jwtService.decodeToken(token);
      if (decodedToken) {
        if (!this.jwtService.isTokenExpired(decodedToken)) {
          localStorage.clear();
          this.router.navigate(['login']);
        } else {
          if (
            Number(
              decodedToken[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
              ]
            ) == 0
          ) {
            this.router.navigate(['/user-management']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      } else {
        // Handle the case where decoding fails
        this.router.navigate(['/login']);
      }
    } else {
      // No token, navigate to the login page
      this.router.navigate(['/login']);
    }
  }
  
}
