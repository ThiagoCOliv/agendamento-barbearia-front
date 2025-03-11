import { Observable } from "rxjs";
import { YesNoDialogComponent } from "../commons/components/yes-no-dialog/yes-no-dialog.component";

export type ComponentType<T> = new (...args: any[]) => T;

export interface IDialogManagerService
{
    showYesNoDialog(component: ComponentType<YesNoDialogComponent>, data: { title: string, content: string }): Observable<any>
}