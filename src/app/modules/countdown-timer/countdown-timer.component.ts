import { Component } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { SequenceService } from '~/app/services/sequence.service';

@Component({
  selector: 'ns-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})

export class CountdownTimerComponent {

    public timer: number;
    public currentExercise: String;
    public urgencyClass: String = 'default';
    private middleMark: number;
    private urgentMark: number;

    constructor(public routingService: RoutingService, public sequenceService: SequenceService) {

    }

    private delay() {
        return new Promise(resolve => setTimeout(resolve, 100));
    }

    public async startRoutine() {
        for(let sequence of this.sequenceService.currentSequence) {
            this.urgencyClass    = sequence['name'] === 'break' ? 'break' : 'default';
            this.currentExercise = sequence['name'];
            this.timer           = this.sequenceService.durations[sequence['duration']]['seconds'];
            this.middleMark      = this.sequenceService.durations[sequence['duration']]['middleMark'];
            this.urgentMark      = this.sequenceService.durations[sequence['duration']]['urgentMark'];

            for(let i = this.timer; i >= 1; i--) {
                this.timer -= 1;
                this.urgencyClass = sequence['duration'] == 'break' ? 'break' : (this.timer <= this.middleMark ? (this.timer <= this.urgentMark ? 'urgent' : 'middle') : 'default');
                await this.delay();
            }
        }
    }
}
