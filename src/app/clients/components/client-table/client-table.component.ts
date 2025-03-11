import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { ClientModelTable } from '../../client.models';
import { SERVICES } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [{ provide: SERVICES.YES_NO_DIALOG, useClass: DialogManagerService }]
})

export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() clients: ClientModelTable[] = [];

  @Output() confirmDelete = new EventEmitter<ClientModelTable>();
  @Output() requestUpdate = new EventEmitter<ClientModelTable>();

  private dialogManagerServiceSubscription?: Subscription;

  constructor(@Inject(SERVICES.YES_NO_DIALOG) private dialogManagerService: IDialogManagerService){}
  
  ngAfterViewInit(): void 
  {
    //TO DO: receber os dados da tabela
  }
  
  ngOnChanges(changes: SimpleChanges): void 
  {
    if(changes['clients'] && this.clients)
    {
      //TO DO
    }
  }
  
  ngOnDestroy(): void 
  {
    if(this.dialogManagerServiceSubscription)
    {
      this.dialogManagerServiceSubscription.unsubscribe();
    }
  }

  update(client: ClientModelTable) 
  {
    throw new Error('Method not implemented.');
  }
  
  delete(client: ClientModelTable) 
  {
    throw new Error('Method not implemented.');
  }
  
  formatPhone(phone: string) 
  {
    return `(${ phone.substring(0, 2) }) ${ phone.substring(2, 7) }-${ phone.substring(7) }`;
  }
}
