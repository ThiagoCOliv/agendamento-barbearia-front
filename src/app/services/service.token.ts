import { InjectionToken } from "@angular/core";
import { IClientService } from "./api-clients/clients/iclients.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manager.service";
import { IScheduleService } from "./api-clients/schedules/ischedules.service";

export const SERVICES = {
    HTTP: {
        CLIENT: new InjectionToken<IClientService>('SERVICES.HTTP.CLIENT'),
        SCHEDULE: new InjectionToken<IScheduleService>('SERVICES.HTTP.SCHEDULE'),
    },
    SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES.SNACKBAR'),
    YES_NO_DIALOG: new InjectionToken<IDialogManagerService>('SERVICES.YES_NO_DIALOG')
}