import {Component, OnInit} from '@angular/core';
import {DistriServiceService} from '../../services/distri-service.service';
import {Distrito, Muni} from '../../models/distrito.model';
import {DistritoDTO} from '../../models/distritoDTO.model';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import {DistriDataServiceService} from '../../services/distri-data-service.service';

@Component({
  selector: 'app-distrito-home',
  imports: [
    Button,
    Dialog,
    InputText,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './distrito-home.component.html',
  styleUrl: './distrito-home.component.css'
})
export class DistritoHomeComponent implements OnInit {

  constructor(private distritoService:DistriServiceService, private dds:DistriDataServiceService) {
  }

  ngOnInit(): void {
    this.distritoService.loadDistritos().subscribe(distri => {
      this.distritos=Object.values(distri);
      this.distritoService.setDistritos(this.distritos);
    })

    this.distritoService.loadMuni().subscribe(myMuni => {
      this.muni= Object.values(myMuni);
      this.distritoService.setMuni(this.muni);
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

  distritos:Distrito[]=[];
  muni:Muni[]=[];
  muni2?:string;
  i?:number;
  visible: boolean = false;

  showDialog(){
    this.visible = true;
    this.clean();
  }

  deleteDistrito(id:number){
    const index=this.distritos.findIndex(x => x.id === id);
    this.distritoService.deleteDistritos(id);
    this.distritos.splice(index,1);
  }


  mostrarDepa(distrito:Distrito){
    for (this.i=0; this.i< this.distritos.length; this.i!++) {
      const depa = this.muni.find(x => x.id == distrito.idMunicipio);
      if (depa?.nombre!=null){
        return this.muni2=depa!.nombre;
      }else {
        return "No se encontraron los municipios";
      }
    }
    return false;
  }


  registroDistrito(){

    const arreglo=this.muni.find(x=>x.nombre===this.cMuni);

    if(arreglo){
      this.cIdMunicipio=arreglo.id
      console.log(this.cIdMunicipio)
    }else {
      console.log('no se encontró'+this.cIdMunicipio)
    }

    let distri=new Distrito(
      this.cId,
      this.cNombre,
      this.cCodigo.toUpperCase(),
      this.cIdMunicipio!,
    )

    let myDist=new DistritoDTO(
      this.cIdMunicipio!,
      this.cNombre,
      this.cCodigo.toUpperCase(),
    )

    this.distritoService.addDistritos(myDist,distri);
    this.clean();
    this.visible=false;
  }


  clean(){
    this.cCodigo='';
    this.cNombre='';
  }

  cId:number=0;
  cIdMunicipio?:number;
  cCodigo:string="";
  cNombre:string='';
  cMuni:string='';

  generarReporte() {
    const formato=this.formato!.find(x=>x.name===this.seleccion)
    console.log(this.seleccion);
    console.log(formato.code);
    switch (this.seleccion) {
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
          a.download = 'reporte_distrito.pdf';
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
