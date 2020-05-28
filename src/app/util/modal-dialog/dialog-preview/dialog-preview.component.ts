import { Component } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
  selector: 'dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.css']
})
export class DialogPreviewComponent {

    public prompt: string;
    public type: string;
    public activities: any;


    constructor(private params: ModalDialogParams) {
        this.prompt = params.context.prompt;
        this.activities = params.context.activities;
    }

    public close(result: string) {
        this.params.closeCallback(result);
    }

    public getActivityString(duration, name) {
        if(name == 'break') {
            return 'break';
        }
        return duration + ' ' + name;
    }
}
