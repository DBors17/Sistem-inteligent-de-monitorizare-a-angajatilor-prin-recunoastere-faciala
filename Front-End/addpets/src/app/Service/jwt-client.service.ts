import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class JwtClientService {

  constructor(private httpClient: HttpClient, private router:Router) { }

  isUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isYourProfile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  crtToken : string ="";
  response:any;

  public generateToken(request:any) {
    return this.httpClient.post<string>("http://localhost:8080/authenticate", request, { responseType: 'text' as 'json' });
  }

  public getAccessToken(authRequest:any){
    let resp=this.generateToken(authRequest);
    resp.subscribe(data=>this.accessApi(data));
  }

  public accessApi(token:any){
         this.crtToken = 'Bearer ' + token.toString();
         sessionStorage.setItem("token", this.crtToken);
         this.isUserAdmin.next(this.getRole() == 'admin');
         this.isUserAuthenticated.next(sessionStorage.getItem('token') != null);
         localStorage.setItem("id",this.getId().toString());
         this.router.navigate(['personal']);
  }

  public isTokenValid(): boolean {
      const item: any = sessionStorage.getItem('token');
      const token: any = jwt_decode(item);
      return token.exp > Date.now() / 1000;
  } 

  public getName(): string {
    const name = 'name';
    try {
      const item: any = sessionStorage.getItem('token');
      const token: any = jwt_decode(item);
      return token[name];
    }
    catch (e) {
      return '';
    }
  }

  public getLastName(): string {
    const name = 'lastname';
    try {
      const item: any = sessionStorage.getItem('token');
      const token: any = jwt_decode(item);
      return token[name];
    }
    catch (e) {
      return '';
    }
  }

  public getId(): string {
    const name = 'id';
    try {
      const item: any = sessionStorage.getItem('token');
      const token: any = jwt_decode(item);
      return token[name];
    }
    catch (e) {
      return '';
    }
  }

  public getRole(): string {
    const name = 'role';
    try {
      const item: any = sessionStorage.getItem('token');
      const token: any = jwt_decode(item);
      return token[name];
    }
    catch (e) {
      return '';
    }
  }

  public loggedIn(): boolean {
     return sessionStorage.getItem('token') != null;
   }

   public isAdmin(): boolean {
      return this.getRole() == 'admin';
  }

  public Logout(){
     sessionStorage.removeItem('token');
     this.isUserAuthenticated.next(false);
  }

  passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;
    checkPassword(password: string): boolean {
      return this.passwordRegex.test(password);
    }
   
   passwordVerification(password:string):boolean{
    if(this.checkPassword(password)) {
      return true;
    } else {
      return false;
    }
  }
}
