import { Component } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { SequenceService } from '~/app/services/sequence.service';

@Component({
  selector: 'ns-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})

export class CountdownTimerComponent {

    public currentNumber: number;
    public currentExercise: String;
    public urgencyClass: String = 'default';

    constructor(public routingService: RoutingService, public sequenceService: SequenceService) {

    }

    private delay() {
        return new Promise(resolve => setTimeout(resolve, 100));
    }

    public async startRoutine(routine: any) {

        for(let sequence of this.sequenceService.currentSequence) {

            console.log(sequence);


            this.urgencyClass    = sequence['name'] === 'break' ? 'break' : 'default';
            this.currentExercise = sequence['name'];
            this.currentNumber   = this.sequenceService.routines[sequence['id']]['seconds'];

            for(let i = this.currentNumber; i >= 1; i--) {
                this.currentNumber -= 1;
                if(this.sequenceService.routines[sequence['id']]['mark' + this.currentNumber]) {
                    this.urgencyClass = this.sequenceService.routines[sequence['id']]['mark' + this.currentNumber];
                }
                await this.delay();
            }
        }
    }
}
