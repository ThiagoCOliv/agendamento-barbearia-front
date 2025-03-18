import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { IDialogManagerService } from './idialog-manager.service';
import { Observable, Subject } from 'rxjs';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class DialogManagerService implements IDialogManagerService
{
  constructor(private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) { }

  showYesNoDialog(data: { title: string; content: string; }): Observable<any> 
  {
    const subject = new Subject<boolean>();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(YesNoDialogComponent);
    const componentRef: ComponentRef<YesNoDialogComponent> = componentFactory.create(this.injector);

    componentRef.instance.title = data.title;
    componentRef.instance.content = data.content;

    componentRef.instance.onClose.subscribe((result: boolean) => {
      subject.next(result);
      subject.complete();
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return subject.asObservable();
  }
}
