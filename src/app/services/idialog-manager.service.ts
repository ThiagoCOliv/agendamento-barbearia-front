import { Observable } from "rxjs";

export interface IDialogManagerService
{
    showYesNoDialog(data: { title: string, content: string }): Observable<any>
}