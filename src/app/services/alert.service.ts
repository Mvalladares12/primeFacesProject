import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

      showNoti(
        message: string,
        action: string = 'Cerrar',
        duration: number = 5000,
        verticalPos: MatSnackBarVerticalPosition = 'bottom',
        horizontalPos: MatSnackBarHorizontalPosition = 'center',
        panelClass: string[] = ['centered-snackbar']
      )
      {
        this.snackBar.open(message, action, {
          duration: duration,
          verticalPosition: verticalPos,
          horizontalPosition: horizontalPos,
          panelClass: panelClass,
        });
      }

  showAlert(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }

  success(message: string, title?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title: title || 'Success!',
      text: message,
      timer: 1000,
      theme: 'dark',
      showConfirmButton: false,
    });
  }

  error(message: string, title?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title: title || 'Error!',
      text: message,
      theme: 'dark',
    });
  }

  confirm(options: SweetAlertOptions): Promise<SweetAlertResult> {
    const defaultOptions: SweetAlertOptions = {
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    };
    return Swal.fire({ ...defaultOptions});
  }

  warning(message: string, title?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title: title || 'Error!',
      text: message,
      theme: 'dark',
    });
  }
}
