import {Component, OnInit,} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {DepartamentoDTO} from '../../models/departamentoDTO.model';
import {Departamento} from '../../models/departamento.model';
import {DepaServiceService} from '../../services/depa-service.service';
import {Router, RouterLink} from '@angular/router';
import {DepaDataServiceService} from '../../services/depa-data-service.service';

@Component({
  selector: 'app-departamento-home',
  imports: [TableModule, CommonModule, RouterLink],
  templateUrl: './departamento-home.component.html',
  styles: [`
    .fullscreen-container {
      width: 50%;
      height: 50%;
      /*overflow: auto;*/
    }
  `]
})
export class DepartamentoHomeComponent implements OnInit {

  constructor(private departamentoService:DepaServiceService, private router:Router, private dds:DepaDataServiceService) {
  }

  ngOnInit(): void {
    this.departamentoService.loadDepartamentos().subscribe(myDepa => {
      this.departamentos=Object.values(myDepa);
      this.departamentoService.setDepartamentos(this.departamentos);
      console.log(this.departamentos);
    })
  }

  index?:number;

  departamentos: Departamento[] = [];

  delete(id:number, index:number) {
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
    this.cCodigo='';
    this.cNombre=''
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
      a.download = 'reporte.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el reporte', error);
    });
  }
}
