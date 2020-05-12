import { Component, OnInit } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { SequenceService } from '~/app/services/sequence.service';

@Component({
  selector: 'ns-create-a-routine',
  templateUrl: './create-a-routine.component.html',
  styleUrls: ['./create-a-routine.component.css']
})
export class CreateARoutineComponent implements OnInit {

    public selectedTime: String;
    public selectedAct:  String;

    constructor(public routingService: RoutingService, public sequenceService: SequenceService) { }

    ngOnInit(): void {
        this.sequenceService.currentSequence.length = 0;
    }

    public selectTime(name: String) {
        this.selectedTime = name;
        if(this.selectedAct) {
            this.sequenceService.addToSequence(this.selectedTime, this.selectedAct);
            this.clearSelection();
        }
    }

    public selectActivity(name: String) {
        if(name == 'break') {
            this.sequenceService.addToSequence('break', 'break');
            return this.clearSelection();
        }
        this.selectedAct = name;
        if(this.selectedTime) {
            this.sequenceService.addToSequence(this.selectedTime, this.selectedAct);
            this.clearSelection();
        }
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
}
