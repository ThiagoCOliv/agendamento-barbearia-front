import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IClientService } from '../../services/api-clients/clients/iclients.service';
import { SERVICES } from '../../services/service.token';
import { ClientsService } from '../../services/api-clients/clients/clients.service';
import { ClientTableComponent } from "../components/client-table/client-table.component";
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Subscription } from 'rxjs';
import { ClientModelTable } from '../client.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [ClientTableComponent],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss',
  providers: [ { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService }, { provide: SERVICES.SNACKBAR, useClass: SnackbarManagerService } ]
})

export class ListClientComponent implements OnInit, OnDestroy
{
  private httpSubricritions: Subscription[] = [];

  clients: ClientModelTable[] = [];

  constructor(
    @Inject(SERVICES.HTTP.CLIENT)private readonly clientService: IClientService,
    @Inject(SERVICES.SNACKBAR)private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ){}

  ngOnInit(): void 
  {
    this.httpSubricritions.push(this.clientService.list().subscribe(data => this.clients = data));
  }
  
  ngOnDestroy(): void 
  {
    this.httpSubricritions.forEach(http => http.unsubscribe());
  }

  update(client: ClientModelTable) 
  {
    this.router.navigate(['clients/edit-client', client.id]);
  }
    
  delete(client: ClientModelTable) 
  {
    this.httpSubricritions.push(this.clientService.delete(client.id).subscribe(() => this.snackbarManager.show(`O cliente ${ client.name } foi excluido com sucesso!`)));
  }
}