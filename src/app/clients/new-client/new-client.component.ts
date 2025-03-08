import { Component, Inject, OnDestroy } from '@angular/core';
import { IClientService } from '../../services/api-clients/clients/iclients.service';
import { SERVICES } from '../../services/service.token';
import { ClientsService } from '../../services/api-clients/clients/clients.service';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers: [ { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService } ]
})
export class NewClientComponent implements OnDestroy
{
  private httpSubscription?: Subscription;

  constructor(@Inject(SERVICES.HTTP.CLIENT)private readonly service: IClientService, private readonly router: Router){}

  ngOnDestroy(): void 
  {
    if(this.httpSubscription)
    {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmit(value: ClientModelForm)
  {
    const { id, ...request } = value;

    this.httpSubscription = this.service.save(request).subscribe(res => {
      this.router.navigate(['clients/list'])
    });
  }
}