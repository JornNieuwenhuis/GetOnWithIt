import { Component, HostListener } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { OrientationService } from '~/app/services/orientation.service';
import { RoutineService } from '~/app/services/routine.service';

@Component({
  selector: 'ns-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})

export class CountdownTimerComponent {

    public timer: number;
    public currentExercise: string;
    public urgencyClass: string = 'default';
    public changeSides: boolean = false;

    constructor(
        public routingService: RoutingService,
        public routineService: RoutineService,
        public orientationService: OrientationService
    ) {

    }

    //Used to ensure sounds stop playing when navigating away
    @HostListener('unloaded')
    pageDestroy() {
        this.routineService.running = false;
    }

    private delay() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    public async startRoutine() {
        this.routineService.running = true;
        countdown:
        for(let routine of this.routineService.currentRoutine) {
            console.log(routine);

            this.currentExercise = routine['name'];
            this.changeSides     = this.routineService.checkChangeSide(routine['duration']);
            console.log(this.changeSides);

            this.timer           = this.routineService.durations[routine['duration']]['seconds'];
            let middleMark       = this.routineService.durations[routine['duration']]['middleMark'];
            let urgentMark       = this.routineService.durations[routine['duration']]['urgentMark'];

            if(routine["name"] != 'break') {
                for(let i = 3; i >= 0; i--) {
                    this.urgencyClass = 'changeTime';
                    await this.delay();
                }
            }

            for(let i = this.timer; i >= 1; i--) {

                //To stop timer on navigate away
                if(!this.routineService.running) {
                    break countdown;
                }

                this.timer -= 1;
                this.urgencyClass = routine['duration'] == 'break' ? 'break' : (this.timer <= middleMark ? (this.timer <= urgentMark ? 'urgent' : 'middle') : 'default');
                await this.delay();
            }
        }
        this.routineService.running = false;
    }
}
