import { Directive, Input, HostListener } from '@angular/core';

var sound = require("nativescript-sound");
const sounds = {
    "lastThree": sound.create('~/app/media/audio/lastThree.mp3'),
    "zero": sound.create('~/app/media/audio/zero.mp3')
};

@Directive({
  selector: '[audioHandler]'
})
export class AudioHandlerDirective {

    @Input() public timer: number;
    @Input() public changeSides: boolean;

    @HostListener('change') ngOnChanges() {
        this.playAudio();
    }

    constructor() { }

    private playAudio() {
        if(this.changeSides && this.timer == 30) {
            console.log('change');
            sounds["zero"].play();
        }
        if(this.timer == 3) {
            sounds["lastThree"].play();
        }
        if(this.timer == 0) {
            sounds["zero"].play();
        }
    }

}
