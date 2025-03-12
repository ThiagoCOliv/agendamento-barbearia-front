import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ScheduleCalendarComponent } from "../components/schedule-calendar/schedule-calendar.component";
import { SERVICES } from '../../services/service.token';
import { IScheduleService } from '../../services/api-clients/schedules/ischedules.service';
import { IClientService } from '../../services/api-clients/clients/iclients.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ClientsService } from '../../services/api-clients/clients/clients.service';
import { SchedulesService } from '../../services/api-clients/schedules/schedules.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, SelectClientModel } from '../schedule.model';
import { SaveScheduleRequest } from '../../services/api-clients/schedules/schedules.module';

@Component({
  selector: 'app-shcedules-month',
  standalone: true,
  imports: [ScheduleCalendarComponent],
  templateUrl: './shcedules-month.component.html',
  styleUrl: './shcedules-month.component.scss',
  providers: [ 
    { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService }, 
    { provide: SERVICES.HTTP.SCHEDULE, useClass: SchedulesService }, 
    { provide: SERVICES.SNACKBAR, useClass: SnackbarManagerService } 
  ]
})

export class ShcedulesMonthComponent implements OnInit, OnDestroy
{
  private subscriptions: Subscription[] = [];
  private selectedDate?: Date;

  monthSchedule!: ScheduleAppointmentMonthModel;
  clients: SelectClientModel[] = [];

  constructor(
    @Inject(SERVICES.HTTP.SCHEDULE) private readonly scheduleService: IScheduleService,
    @Inject(SERVICES.HTTP.CLIENT) private readonly clientService: IClientService,
    @Inject(SERVICES.SNACKBAR) private readonly snackbarService: ISnackbarManagerService,
  ){}

  ngOnInit(): void 
  {
    this.fetchSchedules(new Date());
    this.subscriptions.push(this.clientService.list().subscribe(data => this.clients = data));
  }
  
  ngOnDestroy(): void 
  {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onScheduleClient(schedule: SaveScheduleModel) 
  {
    if(schedule.startAt && schedule.endAt && schedule.clientId)
    {
      const request: SaveScheduleRequest = { startAt: schedule.startAt, endAt:schedule.endAt, clientId: schedule.clientId };
      this.subscriptions.push(this.scheduleService.save(request).subscribe(() => {
        this.snackbarService.show("Agendamento feito com sucesso!");
        
        if(this.selectedDate)
        {
          this.fetchSchedules(this.selectedDate);
        }
      }));
    }
  }
  
  onConfirmDelete(schedule: ClientScheduleAppointmentModel) 
  {
    this.subscriptions.push(this.scheduleService.delete(schedule.id).subscribe());
  }

  onDateChange(date: Date)
  {
    this.selectedDate = date;
    this.fetchSchedules(date);
  }
  
  fetchSchedules(date: Date)
  {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    this.subscriptions.push(this.scheduleService.listMonth(year, month).subscribe(data => this.monthSchedule = data));
  }
}
