import { Injectable } from '@angular/core';

const TOKEN_NAME = "authToken"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //Save token in local storage
  public saveToken(token:string){
    localStorage.setItem(TOKEN_NAME,token);
  }

  //Get token from localstorage
  public getToken(){
    return localStorage.getItem(TOKEN_NAME);
  }

  //Clear token from localstorage
  public clearToken(){
    localStorage.removeItem(TOKEN_NAME);
  }

  //Function to check if token exist
  isTokenExist():boolean{
    const token = localStorage.getItem(TOKEN_NAME)
    return !! token
  }

  //Function to check if token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();

    if (!token) {
      return true; // Token doesn't exist
    }
    const expirationTime = (JSON.parse(atob(token.split('.')[1]))).exp * 1000;
    // Extract expiration time from token and convert to milliseconds
    const currentTime = new Date().getTime();
    return currentTime > expirationTime;
  }

  //Function to get user id from token
  getUserId(): any{
    const token = this.getToken();
    if (!token) {
      return null; // Token doesn't exist
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (!decodedToken) {
      return null; // Decoded token doesn't exist
    }
    const userId = decodedToken.uid;
    return userId;
  }

  //Function to get email and name from token
  getUserEmailAndName(): any{
    const token = this.getToken();
    if (!token) {
      return null; // Token doesn't exist
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (!decodedToken) {
      return null; // Decoded token doesn't exist
    }
    const email = decodedToken.email;
    const name = decodedToken.name;
    return {email,name};
  }
}
