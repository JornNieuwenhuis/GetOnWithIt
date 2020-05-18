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
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

    public currentSequence = [];
    public currentRoutineTitle: string = "New Routine";

    public activities;

    public durations = {
        'break': { 'seconds': 10 },
        '30s': { 'seconds': 30, 'middleMark': 20, 'urgentMark': 10 },
        '60s': { 'seconds': 60, 'middleMark': 30, 'urgentMark': 10 }
    }

    constructor(private sqlite: SqliteService) {
        this.getAllActivities();
    }

    public addToSequence(duration: String, name: String) {
        this.currentSequence.push({'duration': duration, 'name': name});
    }

    public getAllActivities() {
        this.sqlite.getAll("activities").then(result => {
            this.activities = result;
            for(let i = 0; i < Object.keys(result).length; i++) {
                this.activities[i] = {'id': result[i][0], 'name': result[i][1]};
            }
        });
    }

    public addActivity(name: String) {
        this.sqlite.executeSql("INSERT INTO activities (name) VALUES (?)", [name]).then(() => {
            this.getAllActivities();
        });
    }

    public removeActivity(id) {
        this.sqlite.executeSql("DELETE FROM activities WHERE id = ?", [id]).then(() => {
            this.getAllActivities();
        });
    }

}
