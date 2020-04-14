import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

    public currentSequence = [];

    //Names must be linked to currentSequence objects, not here which would link them to the times
    public routines = {
        'break': { 'seconds': 10, 'name': 'break' },
        'sec30': { 'seconds': 30, 'mark10': 'urgent' },
        'sec60': { 'seconds': 60, 'mark30': 'middle', 'mark10': 'urgent' }
    }

    constructor() { }

    public addSequence(id: String, name: String) {
        this.currentSequence.push({'id': id, 'name': name});
    }
}
