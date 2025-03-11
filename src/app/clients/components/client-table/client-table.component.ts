import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { ClientModelTable } from '../../client.models';
import { SERVICES } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { Subscription } from 'rxjs';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';

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
    this.requestUpdate.emit(client);
  }
  
  delete(client: ClientModelTable) 
  {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, { title: 'Excluir cliente', content: `Tem certeza que deseja excluir o cliente ${ client.name }` })
      .subscribe(res => {
        if(res)
        {
          this.confirmDelete.emit(client);
          this.clients = this.clients.filter(cli => cli.id !== client.id);
        }
      });
  }
  
  formatPhone(phone: string) 
  {
    return `(${ phone.substring(0, 2) }) ${ phone.substring(2, 7) }-${ phone.substring(7) }`;
  }
}
