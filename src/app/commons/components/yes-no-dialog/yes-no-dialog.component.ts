import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
  @Output() onClose = new EventEmitter<boolean>();

  title: String = '';
  content: String = '';

  confirm(): void 
  {
    this.onClose.emit(true);
  }

  cancel(): void 
  {
    this.onClose.emit(false);
  }
}
