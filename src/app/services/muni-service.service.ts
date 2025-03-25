import { Injectable } from '@angular/core';
import {MunicipioDTO} from '../models/municipioDTO.model';
import {Depa, Municipio} from '../models/municipio.model';
import {MuniDataServiceService} from './muni-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class MuniServiceService {

  constructor(private dataService:MuniDataServiceService) { }

  setMunicipios(myDepartamento:Municipio[]){
    this.municipios=myDepartamento;
  }



  loadMunicipios(){
    return this.dataService.getMunicipios();
  }


  municipios: Municipio[]=[];


  setDepa(depa:Depa[]){
    this.depa = depa;
  }

  loadDepa(){
    return this.dataService.getDepa();
  }

  depa: Depa[]=[];



  addMunicipios(municipio:MunicipioDTO, muni:Municipio){
    // this.departamentos.push(departamento)
    console.log(this.municipios);
    this.municipios.push(muni);
    this.dataService.saveMunicipios(municipio);
  }



  findMuni(index:number){
    console.log(this.municipios.find(x => x.id == index));
    return this.municipios.find(x => x.id == index);
  }



  updateMunicipios(index:number, id:number, municipio:MunicipioDTO){
    let modifiedMuni=this.municipios.find(x=>x.id===index);
    modifiedMuni!.nombre=municipio.nombre;
    modifiedMuni!.codigo=municipio.codigo;
    this.dataService.updateMunicipios(id,modifiedMuni!);
  }



  deleteMunicipios(index:number){
    this.municipios.splice(index,1);
    this.dataService.deleteMunicipios(index);
    //this.dataService.saveMunicipios(this.municipio);
  }
}
