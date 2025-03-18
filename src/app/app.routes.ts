import { Routes } from '@angular/router';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ListClientComponent } from './clients/list-client/list-client.component';
import { ShcedulesMonthComponent } from './schedules/shcedules-month/shcedules-month.component';

export const routes: Routes = [
    { path: 'clients/edit-client/:id', component: EditClientComponent, data: { title: 'Atualizar cliente' } },
    { path: 'clients/new-client', component: NewClientComponent, data: { title: 'Cadastrar cliente' } },
    { path: 'clients/list', component: ListClientComponent, data: { title: 'Lista de clientes' } },
    { path: 'schedule/month', component: ShcedulesMonthComponent , data: { title: 'Agendamentos' } },
    { path: '**', redirectTo: 'schedule/month' }
];
