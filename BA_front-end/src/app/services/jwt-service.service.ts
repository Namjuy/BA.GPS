import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

////Name   Date       Comments
////duypn  1/3/2024  create
export class JwtService {
  constructor() {}

  /**
   * Decodes a JWT token and returns the payload.
   * @param token - The JWT token to decode.
   * @returns The decoded payload.
   * @throws Error if the token is invalid or in an unexpected format.
   */

  // Arrow function to decode JWT token
  public decodeToken = (token: string): any => {
    // Split the token into segments
    const segments = token.split('.');
    
    // Extract the base64Url part
    const base64Url = segments[1];
    
    // Replace characters for decoding
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decode the base64 string and handle URL encoding
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    // Parse the JSON payload
    return JSON.parse(jsonPayload);
  };

  public isTokenExpired(token: any): boolean {
    const expiration = token.exp * 1000; // Convert expiration time from seconds to milliseconds
    const currentTime = Date.now();
    return expiration < currentTime;
  }

}