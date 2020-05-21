import { Component, OnInit } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { RoutineService } from '~/app/services/routine.service';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { OrientationService } from '~/app/services/orientation.service';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-create-a-routine',
  templateUrl: './create-a-routine.component.html',
  styleUrls: ['./create-a-routine.component.css']
})
export class CreateARoutineComponent implements OnInit {

    public selectedTime: String;
    public selectedAct:  String;
    public orientation;

    constructor(
        public routing: RoutingService,
        public routineService: RoutineService,
        public orientationService: OrientationService,
        private page: Page) {

    }

    ngOnInit(): void {
        this.routineService.currentRoutine.length = 0;
        this.routineService.totalDuration = 0;
        this.routineService.getCurrentRoutineFromDb();
    }

    public selectTime(name: String) {
        this.selectedTime = name;
        if(this.selectedAct) {
            this.addToRoutine();
        }
    }

    public selectActivity(name: String) {
        if(name == 'break') {
            this.scrollToBottom();
            return this.routineService.addToRoutine('break', 'break');
        }
        this.selectedAct = name;
        if(this.selectedTime) {
            this.addToRoutine();
        }
    }

    public async addToRoutine() {
        let activityButton = this.page.getViewById('act' + this.selectedAct);
        let timeButton     = this.page.getViewById(this.selectedTime + 'Button');

        this.routineService.addToRoutine(this.selectedTime, this.selectedAct);
        this.clearSelection();

        activityButton.addPseudoClass('highlighted');
        timeButton.addPseudoClass('highlighted');

        await this.confirmDelay().then(() => {
            activityButton.deletePseudoClass('highlighted');
            timeButton.deletePseudoClass('highlighted');
        });

        this.scrollToBottom(true);
    }

    private confirmDelay() {
        return new Promise(resolve => setTimeout(resolve, 150));
    }

    private async scrollToBottom(skipDelay?) {
        if(skipDelay) {
            let listView: any = this.page.getViewById('routine-listview');
            return listView.scrollToIndex(this.routineService.currentRoutine.length - 1);
        }
        await this.confirmDelay().then(() => {
            let listView: any = this.page.getViewById('routine-listview');
            listView.scrollToIndex(this.routineService.currentRoutine.length - 1);
        });
    }

    private clearSelection() {
        this.selectedAct  = null;
        this.selectedTime = null;
    }

    public checkTimeSelection(name: String) {
        return this.selectedTime == name ? 'selected' : '';
    }

    public checkActSelection(name: String) {
        return this.selectedAct == name ? 'selected' : '';
    }

    public getString(duration, name) {
        if(name == 'break') {
            return 'break';
        }
        return duration + ' ' + name;
    }

    public addActivity() {
        dialogs.prompt({
            title: "New activity",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        }).then(input => {
            if(input.result) {
                this.routineService.saveActivity(input.text);
            }
        });
    }

    public removeActivity(id, name) {
        dialogs.prompt({
            title: "Remove " + name + "?",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        }).then(input => {
            if(input.result) {
                this.routineService.removeActivity(id);
            }
        });
    }

    public getTotalString() {
        if(this.routineService.totalDuration <= 90) {
            return 'Total: ' + this.routineService.totalDuration + 's';
        }
        let minutes = Math.floor(this.routineService.totalDuration / 60);
        let seconds = this.routineService.totalDuration % 60;
        return seconds == 0 ? 'Total: ' + minutes + 'min' : 'Total: ' + minutes + 'min + ' + seconds + 's';

    }

    public saveCurrentRoutineAsName() {
        dialogs.prompt({
            title: "Name your routine: ",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        }).then(input => {
            if(input.result) {
                this.routineService.saveCurrentRoutineAsName(input.text);
            }
        });
    }

}
