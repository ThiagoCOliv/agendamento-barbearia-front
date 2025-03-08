import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientModelForm } from '../../client.models';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent 
{
  @Input() client: ClientModelForm = { id: 0, name: '', email: '', phone: '' };

  @Output() clientSubmited = new EventEmitter<ClientModelForm>();

  onSubmit()
  {
    //TO DO: conferir este metodo
    this.clientSubmited.emit(this.client)
  }
}