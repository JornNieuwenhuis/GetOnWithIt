import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

    public currentSequence = [];
    public currentRoutineTitle: string = "New Routine";
    public totalDuration = 0;

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
        this.setTotalDuration();
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

    private setTotalDuration() {
        let duration = 0;
        this.currentSequence.forEach(item => {
            switch (item.duration) {
                case "30s":
                    duration += 30;
                    break;
                case "60s":
                    duration += 60;
                    break;
                case "break":
                    duration += 5;
                    break;
            }
        });
        this.totalDuration = duration;
    }

}
