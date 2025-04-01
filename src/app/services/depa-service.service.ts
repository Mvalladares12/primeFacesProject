import { Injectable } from '@angular/core';
import {DepartamentoDTO} from '../models/departamentoDTO.model';
import {Departamento} from '../models/departamento.model';
import {DepaDataServiceService} from './depa-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class DepaServiceService {

  constructor(private dataService:DepaDataServiceService) { }

  setDepartamentos(myDepartamento:Departamento[]){
    this.departamentos=myDepartamento;
  }


  loadDepartamentos(/*cred:string*/){
    return this.dataService.getDepartamentos(/*cred*/);
  }


  departamentos: Departamento[]=[];
  departamento?:DepartamentoDTO;
  //departamentoDTO: DepartamentoDTO[]=[];



  addDepartamentos(departamento:DepartamentoDTO, depa:Departamento, token:string){
    this.departamentos.push(depa);
    this.dataService.saveDepartamentos(departamento,token);
  }



  findDepa(index: number){
    console.log(this.departamentos.find(x => x.id == index));
    return this.departamentos.find(x => x.id == index);
  }


  updateDepartamentos(index:number, id:number, departamento:DepartamentoDTO, token:string){
    let modifiedDepa=this.departamentos.find(x => x.id === index);
    modifiedDepa!.nombre=departamento.nombre;
    modifiedDepa!.codigo=departamento.codigo;
    this.dataService.updateDepartamentos(id,modifiedDepa!, token);
  }



  deleteDepartamentos(index:number, token:string){
    this.dataService.deleteDepartamentos(index, token);
    this.departamentos.splice(index,1);
  }

}
