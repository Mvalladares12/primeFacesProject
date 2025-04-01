import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, of, tap} from 'rxjs';
import { CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private cookieService:CookieService) { }

  token:string='';
  apiURL:string='http://localhost:8082/api/user';


  getToken(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic '+btoa(username+':'+password)});
    return this.http.get(this.apiURL, {headers, responseType: "text"}).pipe(
      tap(token=>{
        this.token=token;
      }),
      catchError(error=> {
        console.log(error);
        return of('');
      })
    );
  }


  returnToken() {
    //return this.token;
    return this.cookieService.get("token");
  }


  login(username:string,password:string){
    const headers = new HttpHeaders({Authorization: 'Basic '+btoa(username+':'+password)});
    return this.http.get(this.apiURL, {headers, responseType: "text"});
  }


  isLoged(){
    //return this.token;
    return this.cookieService.get('token');
  }


  logout() {
    this.token = "";
    this.cookieService.set("token", this.token);
    this.router.navigate(['']);
    //window.location.reload();
  }
}
