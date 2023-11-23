import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
const API_URL = `${environment.apiUrl}/News`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // Get all user information
  getAllUserInfo(): Observable<User> {
    return this.http.get<User>(API_URL + "/Auth/CurrentUser");
  }
}
