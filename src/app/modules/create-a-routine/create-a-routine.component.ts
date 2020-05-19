import { Component, OnInit } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { SequenceService } from '~/app/services/sequence.service';
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
        public routingService: RoutingService,
        public sequenceService: SequenceService,
        public orientationService: OrientationService,
        private page: Page) {

    }

    ngOnInit(): void {
        this.sequenceService.currentSequence.length = 0;
        this.sequenceService.totalDuration = 0;
    }

    public selectTime(name: String) {
        this.selectedTime = name;
        if(this.selectedAct) {
            this.addToSequence();
            this.clearSelection();
        }
    }

    public selectActivity(name: String) {
        if(name == 'break') {
            this.scrollToBottom();
            this.sequenceService.addToSequence('break', 'break');
            return this.clearSelection();
        }
        this.selectedAct = name;
        if(this.selectedTime) {
            this.addToSequence();
            this.clearSelection();
        }
    }

    public async addToSequence() {
        let activityButton = this.page.getViewById('act' + this.selectedAct);
        let timeButton = this.page.getViewById(this.selectedTime + 'Button');
        activityButton.addPseudoClass('highlighted');
        timeButton.addPseudoClass('highlighted');

        this.sequenceService.addToSequence(this.selectedTime, this.selectedAct);

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
            let listView: any = this.page.getViewById('sequence-listview');
            return listView.scrollToIndex(this.sequenceService.currentSequence.length - 1);
        }
        await this.confirmDelay().then(() => {
            let listView: any = this.page.getViewById('sequence-listview');
            listView.scrollToIndex(this.sequenceService.currentSequence.length - 1);
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
                this.sequenceService.addActivity(input.text);
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
                this.sequenceService.removeActivity(id);
            }
        });
    }

    public getTotalString() {
        if(this.sequenceService.totalDuration <= 90) {
            return 'Total: ' + this.sequenceService.totalDuration + 's';
        }
        let minutes = Math.floor(this.sequenceService.totalDuration / 60);
        let seconds = this.sequenceService.totalDuration % 60;
        return seconds == 0 ? 'Total: ' + minutes + 'min' : 'Total: ' + minutes + 'min + ' + seconds + 's';

    }

}
