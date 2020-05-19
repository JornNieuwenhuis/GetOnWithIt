import { Component } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { SequenceService } from '~/app/services/sequence.service';
import { OrientationService } from '~/app/services/orientation.service';

@Component({
  selector: 'ns-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})

export class CountdownTimerComponent {

    public timer: number;
    public currentExercise: string;
    public urgencyClass: string = 'default';

    constructor(public routingService: RoutingService, public sequenceService: SequenceService, public orientationService: OrientationService) {

    }

    private delay() {
        return new Promise(resolve => setTimeout(resolve, 100));
    }

    public async startRoutine() {
        this.sequenceService.running = true;
        for(let sequence of this.sequenceService.currentSequence) {

            this.currentExercise = sequence['name'];
            this.timer           = this.sequenceService.durations[sequence['duration']]['seconds'];
            let middleMark       = this.sequenceService.durations[sequence['duration']]['middleMark'];
            let urgentMark       = this.sequenceService.durations[sequence['duration']]['urgentMark'];

            if(sequence["name"] != 'break') {
                for(let i = 5; i >= 0; i--) {
                    this.urgencyClass = 'changeTime';
                    await this.delay();
                }
            }

            for(let i = this.timer; i >= 1; i--) {
                this.timer -= 1;
                this.urgencyClass = sequence['duration'] == 'break' ? 'break' : (this.timer <= middleMark ? (this.timer <= urgentMark ? 'urgent' : 'middle') : 'default');
                await this.delay();
            }
        }
        this.sequenceService.running = false;
    }
}
