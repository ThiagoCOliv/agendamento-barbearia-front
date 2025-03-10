import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-clients/clients/clients.service';
import { IClientService } from '../../services/api-clients/clients/iclients.service';
import { SERVICES } from '../../services/service.token';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../client.models';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers: [ { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService }, { provide: SERVICES.SNACKBAR, useClass: SnackbarManagerService } ]
})

export class EditClientComponent implements OnInit, OnDestroy
{
  private httpSubscriptions: Subscription[] = [];
  client: ClientModelForm = { id: 0, name: '', email: '', phone:'' };

  constructor(
    @Inject(SERVICES.HTTP.CLIENT)private readonly service: IClientService, 
    @Inject(SERVICES.SNACKBAR)private readonly snackbar: ISnackbarManagerService,
    private readonly activedRoute: ActivatedRoute,
    private readonly router: Router
  ){}

  ngOnInit(): void 
  {
    const id = this.activedRoute.snapshot.paramMap.get('id');

    if(!id)
    {
      this.snackbar.show('Erro ao recuperar informações do cliente');
      this.router.navigate(['clients/list']);
      return;
    }

    this.httpSubscriptions?.push(this.service.findById(Number(id)).subscribe(data => this.client = data));
  }

  ngOnDestroy(): void 
  {
    this.httpSubscriptions.forEach(http => http.unsubscribe());
  }

  onSubmit(value: ClientModelForm)
  {
    const { id, ... request } = value;

    if(id)
    {
      this.httpSubscriptions?.push(this.service.update(id, request).subscribe(() => {
        this.snackbar.show('Usuário atualizado com sucesso!');
        this.router.navigate(['clients/list']);
      }));
      return;
    }

    this.snackbar.show('Erro inesperado aconteceu');
    this.router.navigate(['clients/list']);
  }
}