import { Directive, HostListener } from '@angular/core';
import { GestureEventData } from 'tns-core-modules/ui/gestures/gestures';

@Directive({
  selector: '[deselect]'
})
export class DeselectDirective {

    @HostListener('tap') onTap(args: GestureEventData) {
/*         console.log("IN DIRECTIVE: ");

        console.log("Tap!");
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("---------------------------------------"); */
    }

    constructor() { }

}
