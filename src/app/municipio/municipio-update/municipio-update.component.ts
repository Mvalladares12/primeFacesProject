import {Component, OnInit} from '@angular/core';
import {MuniServiceService} from '../../services/muni-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Municipio} from '../../models/municipio.model';
import {MunicipioDTO} from '../../models/municipioDTO.model';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-municipio-update',
  imports: [
    Button,
    InputText,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './municipio-update.component.html',
  styleUrl: './municipio-update.component.css'
})
export class MunicipioUpdateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
              private municipioService:MuniServiceService) { }

  cId:number=0;
  cNombre: string='';
  cCodigo: string='';
  index: number = 0;

  ngOnInit(): void {
    this.municipios=this.municipioService.municipios;
    this.index=parseInt(this.route.snapshot.params['id']);
    console.log(this.municipios);
    console.log(this.index);
    let municipio:Municipio=this.municipioService.findMuni(this.index)!;
    this.cId= municipio.id;
    this.cNombre = municipio.nombre;
    this.cCodigo = municipio.codigo;
  }

  municipios:Municipio[]=[]

  backHome() {
    this.router.navigate(['municipio']);
  }

  update(){
    if(this.cId!=null){
      this.router.navigate(['municipio']);
      const myTabla=new MunicipioDTO(
        this.cId,
        this.cCodigo,
        this.cNombre

      );
      this.municipioService.updateMunicipios(this.index, this.cId,myTabla)
    }else {
      this.router.navigate(['municipio']);
    }
  }
}
