import { Injectable } from '@angular/core';
import { ComponentType, IDialogManagerService } from './idialog-manager.service';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class DialogManagerService implements IDialogManagerService
{
  constructor() { }

  showYesNoDialog(component: ComponentType<YesNoDialogComponent>, data: { title: string; content: string; }): Observable<any> 
  {
    //TO DO: pensar como fazer isso sem utilizar material
  }
}
