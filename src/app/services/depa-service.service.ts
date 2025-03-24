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



  loadDepartamentos(){
    return this.dataService.getDepartamentos();
  }


  departamentos: Departamento[]=[];
  departamento?:DepartamentoDTO;
  //departamentoDTO: DepartamentoDTO[]=[];



  addDepartamentos(departamento:DepartamentoDTO, depa:Departamento){
    // this.departamentos.push(departamento)
    console.log(this.departamentos);
    this.departamentos.push(depa);
    this.dataService.saveDepartamentos(departamento);
  }



  findDepa(index: number){
    console.log(this.departamentos.find(x => x.id == index));
    return this.departamentos.find(x => x.id == index);
  }


  updateDepartamentos(index:number, id:number, departamento:DepartamentoDTO){
    let modifiedDepa=this.departamentos.find(x => x.id === index);
    modifiedDepa!.nombre=departamento.nombre;
    modifiedDepa!.codigo=departamento.codigo;
    this.dataService.updateDepartamentos(id,modifiedDepa!);
  }



  deleteDepartamentos(index:number){
    this.dataService.deleteDepartamentos(index);
    this.departamentos.splice(index,1);
  }

}
