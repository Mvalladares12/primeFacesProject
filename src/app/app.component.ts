import {Component, Injectable, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Toolbar} from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {Router} from '@angular/router';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Toolbar, AvatarModule, ButtonModule, RouterLink, Menu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'proyectoStandalone';

  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Modulos',
        items: [
          {
            label: 'Departamento',
            icon: 'pi pi-map',
            command: () => {
              this.router.navigate(['']);
            }
          },
          {
            label: 'Municipio',
            icon: 'pi pi-building',
            command: () => {
              this.router.navigate(['/update']);
            }
          },
          {
            label: 'Distrito',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/installation']);
            }
          }
        ]
      }
    ];
  }
}
