import { Injectable } from '@angular/core';
import {DistriDataServiceService} from './distri-data-service.service';
import {DistritoDTO} from '../models/distritoDTO.model';
import {Distrito, Muni} from '../models/distrito.model';
import {MuniDataServiceService} from './muni-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class DistriServiceService {

  constructor(private dataDistritoService:DistriDataServiceService, private dataMunicipioService:MuniDataServiceService) { }

  setDistritos(myDepartamento:Distrito[]){
    this.distritos=myDepartamento;
  }



  loadDistritos(){
    return this.dataDistritoService.getDistritos();
  }


  distritos: Distrito[]=[];


  setMuni(muni:Muni[]){
    this.muni=muni;
  }


  loadMuni(){
    return this.dataMunicipioService.getMunicipios();
  }


  muni:Muni[]=[];


  addDistritos(distrito:DistritoDTO, distri:Distrito){
    // this.departamentos.push(departamento)
    console.log(this.distritos);
    this.distritos.push(distri);
    this.dataDistritoService.saveDistritos(distrito);
  }



  findDistri(index: number){
    console.log(this.distritos.find(x => x.id == index));
    return this.distritos.find(x => x.id == index);
  }




  updateDistritos(index:number,id:number, distrito:DistritoDTO){
    let modifiedDistrito=this.distritos.find(x => x.id == index);
    modifiedDistrito!.nombre=distrito.nombre;
    modifiedDistrito!.codigo=distrito.codigo;
    this.dataDistritoService.updateDistritos(id,modifiedDistrito!);
  }



  deleteDistritos(index:number){
    this.distritos.splice(index,1);
    this.dataDistritoService.deleteDistritos(index);
    //this.dataService.saveMunicipios(this.municipio);
  }
}
