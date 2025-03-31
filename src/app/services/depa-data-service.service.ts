import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {DepartamentoDTO} from '../models/departamentoDTO.model';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class DepaDataServiceService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private apiURL: string = "http://localhost:8080/departamento";


  getDepartamentos(){
    const headers={'Authorization': `Basic ${this.loginService.getToken()}`}
    return this.http.get(this.apiURL, {headers});
  }


  saveDepartamentos(departamento:DepartamentoDTO, token:string){
    const headers ={'Authorization': `Bearer ${token}`};
    this.http.post(this.apiURL,departamento, {headers}).subscribe(
      (response)=>console.log('Se guardó el departamento: '+response),
      (error) => console.error(`Error: ${error}`)
    )
  }


  updateDepartamentos(index:number, departamento:DepartamentoDTO, token:string){
    let url= `${this.apiURL}/${index}`;
    const headers ={'Authorization': `Bearer ${token}`};

    this.http.put(url, departamento, {headers}).subscribe(
      (response) => console.log(`Se ha actualizado el departamento: ${response}`),

      (error) => console.log(`Error: ${error}`)
    )
  }



  deleteDepartamentos(index:number, token:string){
    let url= `${this.apiURL}/${index}`;
    const headers ={'Authorization': `Bearer ${token}`};

    this.http.delete(url, {headers}).subscribe(
      (response) => console.log(`Se ha eliminado el departamento: ${response}`),
      (error) => console.log(`Error: ${error}`)
    )
  }

  getReport(formato:string):Observable<Blob>{
    return this.http.get(this.apiURL+`/report/${formato}`, {responseType: "blob"});
  }
}
