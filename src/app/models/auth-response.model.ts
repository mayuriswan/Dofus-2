export interface AuthResponse{
  message : string;
  isAuthenticated:boolean;
  usermane : string;
  email:string;
  role:Array<string>;
  token:string;
  expiresOn:Date;
  errors:Array<string>;
}
