import { Component } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { RoutineService } from '~/app/services/routine.service';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'dialog-save-routine',
  templateUrl: './dialog-save-routine.component.html',
  styleUrls: ['./dialog-save-routine.component.css']
})
export class DialogSaveRoutineComponent {

    public prompt: string;
    public routines: any;

    constructor(private params: ModalDialogParams, public routineService: RoutineService) {
        this.prompt   = params.context.prompt;
        this.routines = params.context.routines;
    }

    public close(result: string) {
        this.params.closeCallback(result);
    }

    public saveRoutine(routineName) {
        this.params.closeCallback(routineName);
    }
}
