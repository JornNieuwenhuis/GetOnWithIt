import { Component, HostListener } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { OrientationService } from '~/app/services/orientation.service';
import { RoutineService } from '~/app/services/routine.service';

var sound = require("nativescript-sound");
const sounds = {
    "lastFive": sound.create('~/app/media/audio/lastFive.mp3'),
    "go": sound.create('~/app/media/audio/go.mp3')
};

@Component({
  selector: 'ns-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})

export class CountdownTimerComponent {

    public timer: number;
    public currentExercise: string;
    public urgencyClass: string = 'default';

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
        for(let routine of this.routineService.currentRoutine) {

            sounds["go"].play();

            this.currentExercise = routine['name'];
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
                    //TODO: Find way to stop async function
                    return;
                }

                this.timer -= 1;
                this.urgencyClass = routine['duration'] == 'break' ? 'break' : (this.timer <= middleMark ? (this.timer <= urgentMark ? 'urgent' : 'middle') : 'default');
                if(this.timer == 4) {
                    sounds["lastFive"].play();
                }
                await this.delay();
            }
        }
        this.routineService.running = false;
    }
}
