import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiToken: string = "http://localhost:8081/jwt";
  private token:string='';

  getToken(){
    return this.http.get(this.apiToken, {responseType: "text"}).pipe(
      tap(token=>this.token=token),
      catchError(error=>{
        console.log(error);
        return of('');
      })
    );
  }
}
