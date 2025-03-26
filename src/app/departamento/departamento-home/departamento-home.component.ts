import {Component, OnInit,} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {DepartamentoDTO} from '../../models/departamentoDTO.model';
import {Departamento} from '../../models/departamento.model';
import {DepaServiceService} from '../../services/depa-service.service';
import { RouterLink} from '@angular/router';
import {DepaDataServiceService} from '../../services/depa-data-service.service';
import { ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Select} from 'primeng/select';


@Component({
  selector: 'app-departamento-home',
  imports: [TableModule, ButtonModule, ToastModule, CommonModule, RouterLink, ButtonModule, Dialog, InputTextModule, FormsModule, Select],
  templateUrl: './departamento-home.component.html',
  styles: [
    `.fullscreen-container {
      width: 100%;
      height: 100%;
      /*overflow: auto*/
    }`
  ],
  providers: [ConfirmationService, MessageService]
})
export class DepartamentoHomeComponent implements OnInit {

  constructor(private departamentoService:DepaServiceService, private dds:DepaDataServiceService) {
  }

  ngOnInit(): void {
    this.departamentoService.loadDepartamentos().subscribe(myDepa => {
      this.departamentos=Object.values(myDepa);
      this.departamentoService.setDepartamentos(this.departamentos);
      console.log(this.departamentos);
    })
    this.countries = [
      { name: 'pdf', code: 'pdf' },
      { name: 'word', code: 'word' },
      { name: 'excel', code: 'excel' }
    ];
  }

  countries: any[] | undefined;

  selectedCountry: string | undefined;

  departamentos: Departamento[] = [];

  visible: boolean = false;

  showDialog(){
    this.visible = true;
    this.clean();
  }

  delete(id:number) {
    const index=this.departamentos.findIndex(x => x.id === id);
    this.departamentoService.deleteDepartamentos(id);
    this.departamentos.splice(index,1);
  }

  registTabla(){
    let depa=new Departamento(
      this?.cId,
      this.cCodigo.toUpperCase(),
      this.cNombre
    )
    let myDepartamento=new DepartamentoDTO(
      //this?.cId,
      this.cCodigo.toUpperCase(),
      this.cNombre
    );
    this.departamentoService.addDepartamentos(myDepartamento, depa);
    this.clean()
    this.visible = false;
  }

  clean(){
    this.cCodigo='';
    this.cNombre='';
  }

  cId:number=0;
  cCodigo:string="";
  cNombre:string='';

  generarReporte() {
    this.dds.getReport().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_departamento.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el reporte', error);
    });
  }
}
