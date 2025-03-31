import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DepaServiceService} from '../../services/depa-service.service';
import {Departamento} from '../../models/departamento.model';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {DepartamentoDTO} from '../../models/departamentoDTO.model';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-departamento-update',
  imports: [
    TableModule,
    FormsModule,
    Button,
    InputText,
    NgIf
  ],
  templateUrl: './departamento-update.component.html',
  styleUrl: './departamento-update.component.css'
})
export class DepartamentoUpdateComponent implements OnInit {

  constructor(private departamentoService:DepaServiceService, private route: ActivatedRoute, private router: Router, private auth:AuthService, private alertService:AlertService) { }

  cId:number=0;
  cNombre: string='';
  cCodigo: string='';
  index: number = 0;

  ngOnInit(): void {
      this.departamentos=this.departamentoService.departamentos;
      this.index=parseInt(this.route.snapshot.params['id']);
      let departamento:Departamento=this.departamentoService.findDepa(this.index)!;
      this.cId= departamento.id;
      this.cNombre = departamento.nombre;
      this.cCodigo = departamento.codigo;

      this.auth.getToken().subscribe(
        token=>this.token=token,
      )
  }

  token:string='';

  departamentos:Departamento[] = [];

  backHome() {
    this.router.navigate(['/depa']);
  }

  update(){
    if(this.cId!=null){
      this.router.navigate(['/depa']);
      this.alertService.success('Departamento modificado', 'success!');
      const myTabla=new DepartamentoDTO(
        this.cCodigo,
        this.cNombre
      );
      this.departamentoService.updateDepartamentos(this.index, this.cId,myTabla, this.token);
      this.departamentoService.departamentos=this.departamentos;
    }else {
      this.router.navigate(['/depa']);
    }
  }
}
