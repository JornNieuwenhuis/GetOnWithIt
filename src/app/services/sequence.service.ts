import { Injectable } from '@angular/core';
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "tns-core-modules/application-settings";

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

    public currentSequence = [];

    //TODO: Retrieve from memory
    public activities = new Array<any>(
        { id: 1, name: "pushups" },
        { id: 2, name: "pullups" },
        { id: 3, name: "planking" },
        { id: 4, name: "rennen" },
        { id: 5, name: "situps" },
        { id: 6, name: "luchtboxen" },
        { id: 7, name: "jumping jacks" },
        { id: 8, name: "gewichten" },
        { id: 9, name: "fietsen" }
    );

    public durations = {
        'break': { 'seconds': 10 },
        '30s': { 'seconds': 30, 'middleMark': 20, 'urgentMark': 10 },
        '60s': { 'seconds': 60, 'middleMark': 30, 'urgentMark': 10 }
    }

    constructor() { }

    public addToSequence(duration: String, name: String) {
        this.currentSequence.push({'duration': duration, 'name': name});
    }
}
