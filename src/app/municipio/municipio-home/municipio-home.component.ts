import {Component, OnInit} from '@angular/core';
import {MuniServiceService} from '../../services/muni-service.service';
import {Depa, Municipio} from '../../models/municipio.model';
import {MunicipioDTO} from '../../models/municipioDTO.model';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import {MuniDataServiceService} from '../../services/muni-data-service.service';

@Component({
  selector: 'app-municipio-home',
  imports: [
    Button,
    Dialog,
    InputText,
    NgIf,
    ReactiveFormsModule,
    TableModule,
    RouterLink,
    FormsModule,
    NgForOf
  ],
  templateUrl: './municipio-home.component.html',
  styleUrl: './municipio-home.component.css'
})
export class MunicipioHomeComponent implements OnInit {

  constructor(private municipioService:MuniServiceService, private mds:MuniDataServiceService) {
  }

  ngOnInit(): void {
    this.municipioService.loadMunicipios().subscribe(myMunicipio => {
      this.municipios=Object.values(myMunicipio);
      this.municipioService.setMunicipios(this.municipios);
      console.log(this.municipios);
    })

    this.municipioService.loadDepa().subscribe((myDepartamento) => {
      this.depa=Object.values(myDepartamento);
      this.municipioService.setDepa(this.depa);
    })

    this.formato = [
      { name: 'pdf', code: 'pdf' },
      { name: 'word', code: 'docx' },
      { name: 'excel', code: 'xlsx' }
    ];
  }

  formato: any[] | undefined;

  seleccion: string='';

  index?:number;
  cId:number=0;
  cIdDepartam?:number;
  cCodigo:string="";
  cNombre:string='';
  cDepa:string='';

  municipios:Municipio[]=[];
  depa:Depa[]=[];
  depa2?:string;
  depa3:any[]=[];
  i?: number;
  visible: boolean = false;

  showDialog(){
    this.visible = true;
    this.clean();
  }

  deleteMunicipios(id:number){
    // this.municipioService.deleteMunicipios(id);
    // this.municipios.splice(index,1);

    const index=this.municipios.findIndex(x => x.id === id);
    this.municipioService.deleteMunicipios(id);
    this.municipios.splice(index,1);
  }


  mostrarDepa(municipio:Municipio){
    for (this.i=0; this.i< this.municipios.length; this.i!++) {
      const depa = this.depa.find(x => x.id == municipio.idDepartamento);
      if(depa?.nombre!=null){
        return this.depa2=depa!.nombre;
      }else {
        return "No se encontraron los departamentos";
      }

    }
    return false;
  }




  registMunicipio(){

    const arreglo=this.depa.find(x=>x.nombre===this.cDepa);

    if(arreglo){
      this.cIdDepartam=arreglo.id
      console.log(this.cIdDepartam)
    }else {
      console.log('no se encontró'+this.cIdDepartam)
    }


    let muni=new Municipio(
      this.cId,
      this.cIdDepartam!,
      this.cCodigo.toUpperCase(),
      this.cNombre,
    )


    let myMuni=new MunicipioDTO(
      this.cIdDepartam!,
      this.cCodigo.toUpperCase(),
      this.cNombre,
    )

    this.municipioService.addMunicipios(myMuni, muni);
    this.clean();
    this.visible = false;
  }

  clean(){
    this.cCodigo='';
    this.cNombre='';
  }

  generarReporte() {
    const formato=this.formato!.find(x=>x.name===this.seleccion)
    console.log(this.seleccion);
    console.log(formato.code);
    switch (this.seleccion) {
      case 'pdf':
        this.mds.getReport(formato.code).subscribe((data: Blob) => {
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
        this.mds.getReport(formato.code).subscribe((data: Blob) => {
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
        this.mds.getReport(formato.code).subscribe((data: Blob) => {
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
    }

  }
}
