import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

  showNoti(message:string, action:string='close'){
    this.snackBar.open(message,action,{
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }
}
