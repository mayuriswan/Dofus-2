import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registre } from '../../models/registre.model';
import { Login } from '../../models/login.model';
import { AuthResponse } from '../../models/auth-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token-service/token.service';
import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/Auth/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //BehaviorSubject is used to notify the subscribers about the change in the value of isLoggedIn.
    private isLoggedInSubject = new BehaviorSubject<boolean>(!!this.tokenService.isTokenExist());
     //isLoggedIn$ is used to get the value of isLoggedInSubject.
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,private tokenService:TokenService) { }

  public register(registerRequest : Registre): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(API_URL+"register" , registerRequest);
  }

  public login(loginRequest : Login): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(API_URL+"token" , loginRequest);
  }

  //check if user is logged in
  public isLoggedIn(): boolean {

    const isLoggedIn = this.tokenService.isTokenExist();
    this.isLoggedInSubject.next(isLoggedIn);
    return isLoggedIn;

  }

  //logout
  public logout():void{
    this.tokenService.clearToken();
    this.isLoggedInSubject.next(false);
  }

}
