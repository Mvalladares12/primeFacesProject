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
import {AlertService} from '../../services/alert.service';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {AuthService} from '../../services/auth.service';
import {MuniServiceService} from '../../services/muni-service.service';
import {Municipio} from '../../models/municipio.model';
import {LoginService} from '../../login/login.service';
import {Select} from 'primeng/select';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

interface formato {
  name: string;
  code: string;
}

@Component({
  selector: 'app-departamento-home',
  imports: [TableModule, ConfirmPopupModule, ButtonModule, ToastModule, CommonModule, RouterLink, ButtonModule, Dialog, InputTextModule, FormsModule, Select, SweetAlert2Module],
  templateUrl: './departamento-home.component.html',
  styles: [
    `.fullscreen-container {
      width: 100%;
      height: 100%;
    }`
  ],
})
export class DepartamentoHomeComponent implements OnInit {

  constructor(private departamentoService:DepaServiceService, private loginService:LoginService, private dds:DepaDataServiceService, private municipioService:MuniServiceService, private alertService:AlertService, private auth:AuthService) {
  }

  ngOnInit(): void {

    this.departamentoService.loadDepartamentos(/*this.loginService.token*/).subscribe(myDepa => {
      this.departamentos=Object.values(myDepa);
      this.departamentoService.setDepartamentos(this.departamentos);
    })


    this.municipioService.loadMunicipios().subscribe(myMunicipio => {
      this.municipios=Object.values(myMunicipio);
      this.municipioService.setMunicipios(this.municipios);
    })


    this.formato = [
      { name: 'pdf', code: 'pdf' },
      { name: 'word', code: 'docx' },
      { name: 'excel', code: 'xlsx' }
    ];
  }

  token:string='';

  formato: any[] | undefined;

  sele: formato|undefined;

  municipios:Municipio[]=[];

  departamentos: Departamento[] = [];

  visible: boolean = false;

  cId:number=0;
  cCodigo:string="";
  cNombre:string='';

  showDialog(){
    this.visible = true;
    this.clean();
  }

  eval(id:number){
    const del=this.municipios.find(i => i.idDepartamento == id);
    console.log(del);

    if (del!=null) {
      this.alertService.error('Este departamento no puede ser borrado porque contiene municipios relacionados!', 'Error!');
    }else {
      this.delete(id);
      this.alertService.success('Departamento borrado!', 'success!');
    }
  }

  delete(id:number) {
      const index=this.departamentos.findIndex(x => x.id === id);
      this.departamentoService.deleteDepartamentos(id, this.token);
      this.departamentos.splice(index,1);
  }

  registTabla(){
    const unique=this.departamentos.find(x => x.codigo.toUpperCase() === this.cCodigo.toUpperCase());
    const mayus=this.cCodigo.toUpperCase();

    if(unique?.codigo != mayus){
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
      this.departamentoService.addDepartamentos(myDepartamento, depa, this.token);
      this.clean()
      this.alertService.success('Departamento agregado!', 'success!');
      this.visible = false;
    }else {
      this.alertService.warning('Este código ya existe, ingresa otro', 'Codigo existente')
    }

  }

  clean(){
    this.cCodigo='';
    this.cNombre='';
  }

  generarReporte() {
    const formato=this.formato!.find(x=>x.name===this.sele?.name)
    console.log(this.sele?.code);
    console.log(formato.code);
    switch (this.sele?.name) {
      case 'pdf':
        this.dds.getReport(formato.code).subscribe((data: Blob) => {
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
        break;
      case 'excel':
        this.dds.getReport(formato.code).subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reporte_departamento.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, error => {
          console.error('Error al descargar el reporte', error);
        });
        break;
      case 'word':
        this.dds.getReport(formato.code).subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reporte_departamento.docx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, error => {
          console.error('Error al descargar el reporte', error);
        });
        break;
      case '':
        this.dds.getReport('pdf').subscribe((data: Blob) => {
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
        break;
        default:
          console.error('Error al descargar el reporte');
          break;
    }

  }
}
