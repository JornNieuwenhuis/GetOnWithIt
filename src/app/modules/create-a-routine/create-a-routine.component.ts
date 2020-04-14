import { Component, OnInit } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';
import { SequenceService } from '~/app/services/sequence.service';

@Component({
  selector: 'ns-create-a-routine',
  templateUrl: './create-a-routine.component.html',
  styleUrls: ['./create-a-routine.component.css']
})
export class CreateARoutineComponent implements OnInit {

    constructor(public routingService: RoutingService, public sequenceService: SequenceService) { }

    ngOnInit(): void {
        this.sequenceService.currentSequence.length = 0;
    }



}
