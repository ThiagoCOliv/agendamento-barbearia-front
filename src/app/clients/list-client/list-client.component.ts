import { Component, Inject } from '@angular/core';
import { IClientService } from '../../services/api-clients/clients/iclients.service';
import { SERVICES } from '../../services/service.token';
import { ClientsService } from '../../services/api-clients/clients/clients.service';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss',
  providers: [ { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService } ]
})
export class ListClientComponent 
{
  constructor(@Inject(SERVICES.HTTP.CLIENT)private readonly service: IClientService){}
}