import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DistriServiceService} from '../../services/distri-service.service';
import {Distrito} from '../../models/distrito.model';
import {DistritoDTO} from '../../models/distritoDTO.model';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-distrito-update',
  imports: [
    Button,
    InputText,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './distrito-update.component.html',
  styleUrl: './distrito-update.component.css'
})
export class DistritoUpdateComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private distritoService:DistriServiceService) {
  }

  cId:number=0;
  cNombre: string='';
  cCodigo: string='';
  index: number = 0;

  ngOnInit(): void {
    this.distritos=this.distritoService.distritos;
    this.index=parseInt(this.route.snapshot.params['id']);
    console.log(this.distritos);
    console.log(this.index);
    let distrito:Distrito=this.distritoService.findDistri(this.index)!;
    this.cId= distrito.id;
    this.cNombre = distrito.nombre;
    this.cCodigo = distrito.codigo;
  }

  distritos:Distrito[] = [];

  backHome() {
    this.router.navigate(['distrito']);
  }

  update(){
    if(this.cId!=null){
      this.router.navigate(['distrito']);
      const myTabla=new DistritoDTO(
        this.cId,
        this.cNombre,
        this.cCodigo
      );
      this.distritoService.updateDistritos(this.index, this.cId,myTabla)
    }else {
      this.router.navigate(['distrito']);
    }
  }
}
