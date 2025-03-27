import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartamentoDTO} from '../models/departamentoDTO.model';

@Injectable({
  providedIn: 'root',
})
export class DepaDataServiceService {

  constructor(private http: HttpClient) { }

  private apiURL: string = "http://localhost:8080/departamento";
  private apiDepa: string = "http://localhost:8080/departamento";

  getDepartamentos(){
    return this.http.get(this.apiURL);
  }


  saveDepartamentos(departamento:DepartamentoDTO){
    //const departamentoObj={departamento}
    this.http.post(this.apiURL,departamento).subscribe(
      (response)=>console.log('Se guardó el departamento: '+response),
      (error) => console.error(`Error: ${error}`)
    )
  }


  updateDepartamentos(index:number, departamento:DepartamentoDTO){
    let url= `${this.apiURL}/${index}`;

    this.http.put(url, departamento).subscribe(
      (response) => console.log(`Se ha actualizado el departamento: ${response}`),

      (error) => console.log(`Error: ${error}`)
    )
  }



  deleteDepartamentos(index:number){
    let url= `${this.apiURL}/${index}`;

    this.http.delete(url).subscribe(
      (response) => console.log(`Se ha eliminado el departamento: ${response}`),
      (error) => console.log(`Error: ${error}`)
    )
  }

  getReport(formato:string):Observable<Blob>{
    return this.http.get(this.apiURL+`/report/${formato}`, {responseType: "blob"});
  }
}
