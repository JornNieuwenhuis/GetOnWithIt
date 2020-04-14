import { Component } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';

@Component({
  selector: 'ns-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})

export class CountdownTimerComponent {

    public currentNumber: number;
    public currentExercise: String;
    public urgencyClass: String = 'default';

    private routines = {
        'break': { 'seconds': 10, 'name': 'break' },
        'sec30': { 'seconds': 30, 'name': 'push-ups', 'mark10': 'urgent' },
        'sec60': { 'seconds': 60, 'name': 'stretchings', 'mark30': 'middle', 'mark10': 'urgent' }
    }

    constructor(public routingService: RoutingService) {

    }

    private delay() {
        return new Promise(resolve => setTimeout(resolve, 100));
    }

    public async startRoutine(routine: any) {

        for(let sequence of routine) {

            this.urgencyClass    = this.routines[sequence]['name'] === 'break' ? 'break' : 'default';
            this.currentExercise = this.routines[sequence]['name'];
            this.currentNumber   = this.routines[sequence]['seconds'];

            for(let i = this.currentNumber; i >= 1; i--) {
                this.currentNumber -= 1;
                if(this.routines[sequence]['mark' + this.currentNumber]) {
                    this.urgencyClass = this.routines[sequence]['mark' + this.currentNumber];
                }
                await this.delay();
            }
        }
    }
}
