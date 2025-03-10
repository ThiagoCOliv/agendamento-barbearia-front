import { Injectable } from '@angular/core';
import { ISnackbarManagerService } from './isnackbar-manager.service';

@Injectable({
  providedIn: 'root'
})

export class SnackbarManagerService implements ISnackbarManagerService
{
  constructor(/*private readonly snackBar: any*/) { }
  
  show(message: string, action: string = 'Fechar', duration: number = 3000): void 
  {
    //this.snackBar.open(message, action, { duration, verticalPosition: 'top', horizontalPosition: 'right' })
  }
}
