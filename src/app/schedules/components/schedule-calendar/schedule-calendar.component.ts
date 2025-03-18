import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { SERVICES } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, SelectClientModel } from '../../schedule.model';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule-calendar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
  providers: [ { provide: SERVICES.YES_NO_DIALOG, useClass: DialogManagerService } ]
})

export class ScheduleCalendarComponent implements AfterViewInit, OnChanges, OnDestroy
{
  private _selected: Date = new Date();
  private dialogManagerServiceSubscription?: Subscription;

  private readonly inicialSchedule: SaveScheduleModel = { startAt: undefined, endAt: undefined, clientId: undefined };

  schedules!: ClientScheduleAppointmentModel[];
  newSchedule: SaveScheduleModel = this.inicialSchedule;
  endAtShow!: String;
  addingSchedule: boolean = false;
  clientSelectFormControl = new FormControl();

  @Input() clients: SelectClientModel[] = [];
  @Input() monthSchedule!: ScheduleAppointmentMonthModel;
  
  @Output() confirmDelete = new EventEmitter<ClientScheduleAppointmentModel>();
  @Output() dateChange = new EventEmitter<Date>();
  @Output() scheduleClient = new EventEmitter<SaveScheduleModel>();

  constructor(@Inject(SERVICES.YES_NO_DIALOG) private readonly dialogManagerService: IDialogManagerService){}

  get selected(): Date
  {
    return this._selected;
  }

  set selected(selected: Date)
  {
    const selection = new Date(selected);
    if(this._selected.getTime() !== selection.getTime())
    {
      this.dateChange.emit(selection);
      this.buildTable();
      this._selected = selection;
    }

  }
  
  ngAfterViewInit(): void 
  {
    //throw new Error('Method not implemented.');
  }
  
  ngOnChanges(changes: SimpleChanges): void 
  {
    if(changes['monthSchedule'] && this.monthSchedule)
    {
      this.buildTable();
    }
  }

  ngOnDestroy(): void 
  {
    if(this.dialogManagerServiceSubscription)
    {
      this.dialogManagerServiceSubscription.unsubscribe();
    }
  }

  private buildTable()
  {
    const appointments = this.monthSchedule.scheduledAppointments.filter(a => {
      this.monthSchedule.year === this._selected.getFullYear() && this.monthSchedule.month === this._selected.getMonth() + 1 && a.day === this._selected.getDate()
    });

    console.log(appointments)

    this.schedules = appointments;
  }

  requestDelete(schedule: ClientScheduleAppointmentModel)
  {
    this.dialogManagerServiceSubscription = this.dialogManagerService.showYesNoDialog(YesNoDialogComponent, { title: 'Excluir', content: 'Confirmar exclusão do agendamento?' }).subscribe(res => {
      if(res)
      {
        this.confirmDelete.emit(schedule);
        this.schedules = this.schedules.filter(sch => sch.id !== schedule.id);
      }
    });
  }

  onTimeChange(time: Date)
  {
    const endAt = new Date(time);
    endAt.setHours(endAt.getHours() + 1);
    this.newSchedule.endAt = endAt;
    const endAtMonth = endAt.getMonth() < 9 ? `0${endAt.getMonth() + 1}` : endAt.getMonth() + 1;
    const endAtDay = endAt.getDate() < 9 ? `0${endAt.getDate()}` : endAt.getDate();
    this.endAtShow = `${endAt.getFullYear()}-${endAtMonth}-${endAtDay}T${endAt.getHours()}:${endAt.getMinutes()}`;
  }

  onSubmit(form: NgForm)
  {
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);
    startAt.setHours(this.newSchedule.startAt!.getHours(), this.newSchedule.startAt!.getMinutes());
    endAt.setHours(this.newSchedule.endAt!.getHours(), this.newSchedule.endAt!.getMinutes());

    const saved: ClientScheduleAppointmentModel = {
      id:-1,
      day: this._selected.getDate(),
      startAt,
      endAt,
      clientId: this.newSchedule.clientId!,
      clientName: this.clients.find(cli => cli.id === this.newSchedule.clientId!)!.name
    }

    this.monthSchedule.scheduledAppointments.push(saved);
    this.scheduleClient.emit(saved);
    this.buildTable();
    form.resetForm();
    this.newSchedule = this.inicialSchedule;
  }
}