import { Injectable } from '@angular/core';
import { IScheduleService } from './ischedules.service';
import { Observable } from 'rxjs';
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from './schedules.module';
import { enviroment } from '../../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SchedulesService implements IScheduleService
{
  private readonly baseUrl = enviroment.apiURL;

  constructor(private http: HttpClient) { }

  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse> 
  {
    return this.http.post<SaveScheduleResponse>(`${ this.baseUrl }schedules`, request);
  }
  
  delete(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${ this.baseUrl }schedules/${ id }`);
  }
  
  listMonth(year: number, month: number): Observable<ScheduleAppointmentMonthResponse> 
  {
    return this.http.get<ScheduleAppointmentMonthResponse>(`${ this.baseUrl }schedules/${ year }/${ month }`);
  }
}
