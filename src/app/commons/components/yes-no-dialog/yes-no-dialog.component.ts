import { Component, Inject } from '@angular/core';
import { SERVICES } from '../../../services/service.token';

@Component({
  selector: 'app-yes-no-dialog',
  standalone: true,
  imports: [],
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.scss'
})

export class YesNoDialogComponent 
{
  constructor(@Inject(SERVICES.YES_NO_DIALOG) public readonly data: any){}
}
