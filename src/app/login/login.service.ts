import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  token:string='';

  getToken(){
    return this.token;
  }

  login(username:string,password:string){
    const headers = new HttpHeaders({Authorization: 'Basic '+btoa(username+':'+password)});
    this.token=btoa(username+':'+password);
    return this.http.get("http://localhost:8082/api/user", {headers, responseType: "text"});
  }

  isLoged(){
    return this.token;
  }

  logout() {
    this.token = "";
    this.router.navigate(['']);
    //window.location.reload();
  }
}
