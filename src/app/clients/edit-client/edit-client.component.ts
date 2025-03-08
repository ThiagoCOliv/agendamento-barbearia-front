import { Component, Inject } from '@angular/core';
import { ClientsService } from '../../services/api-clients/clients/clients.service';
import { IClientService } from '../../services/api-clients/clients/iclients.service';
import { SERVICES } from '../../services/service.token';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers: [ { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService } ]
})
export class EditClientComponent 
{
  constructor(@Inject(SERVICES.HTTP.CLIENT)private readonly service: IClientService){}
}