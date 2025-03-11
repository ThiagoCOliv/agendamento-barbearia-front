import { Observable } from "rxjs";
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from "./schedules.module";

export interface IScheduleService
{
    save(request: SaveScheduleRequest): Observable<SaveScheduleResponse>
    delete(id: number): Observable<void>
    listMonth(year: number, month: number): Observable<ScheduleAppointmentMonthResponse>
}