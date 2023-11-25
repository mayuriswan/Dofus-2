import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token-service/token.service';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient , private tokenService : TokenService) { }

  // Get all user information
  getAllUserInfo(): Observable<User> {
    const token = this.tokenService.getToken();

    if (token) {
      // Clone the request and set the Authorization header
      const authRequest = this.getRequestWithAuthorizationHeader(token);

      return this.http.get<User>(API_URL + "/Auth/CurrentUser", { headers: authRequest.headers });
    } else {
      // Handle the case where no token is available
      // You might want to throw an error or handle it in another way
      console.error('No token available');
      return this.http.get<User>(API_URL + "/Auth/CurrentUser"); // Update this line based on your error handling strategy
    }
  }


  private getRequestWithAuthorizationHeader(token: string): HttpRequest<any> {
    const authHeader = `Bearer ${token}`;
    const headers = new HttpHeaders({ 'Authorization': authHeader });
    const authRequest = new HttpRequest<any>('GET', '', null, { headers });

    
    return authRequest;
  }

}
