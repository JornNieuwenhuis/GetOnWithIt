import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

    public currentRoutine: any = [];
    public currentRoutineTitle: string = "New Routine";
    public totalDuration = 0;

    public savedRoutines: any = [];

    public running: boolean = false;

    public activities;

    public durations = {
        'break': { 'seconds': 10 },
        '30s': { 'seconds': 30, 'middleMark': 20, 'urgentMark': 10 },
        '60s': { 'seconds': 60, 'middleMark': 30, 'urgentMark': 10 }
    }

    constructor(private sqlite: SqliteService) {
        this.getAllActivities();
    }

    public addToRoutine(duration: String, name: String) {
        this.currentRoutine.push({'duration': duration, 'name': name});
        this.setTotalDuration();
        this.saveCurrentRoutine();
    }

    public getAllActivities() {
        return this.sqlite.getAll("activities").then(result => {
            this.activities = result;
            for(let i = 0; i < Object.keys(result).length; i++) {
                this.activities[i] = {'id': result[i][0], 'name': result[i][1]};
            }
        });
    }

    public saveActivity(name: String) {
        return this.sqlite.executeSql("INSERT INTO activities (name) VALUES (?)", [name]).then(() => {
            this.getAllActivities();
        });
    }

    public removeActivity(id) {
        return this.sqlite.executeSql("DELETE FROM activities WHERE id = ?", [id]).then(() => {
            this.getAllActivities();
        });
    }

    public saveCurrentRoutine() {
        this.clearCurrentRoutineFromDb().then(() => {
            for(let i = 0; i < this.currentRoutine.length; i++) {
                this.sqlite.executeSql(
                    "INSERT INTO routines (routine_name, act_name, duration) VALUES (?,?,?)",
                    ['current', this.currentRoutine[i].name, this.currentRoutine[i].duration]
                );
            }
            return;
        });
    }

    public clearCurrentRoutineFromDb() {
        return this.sqlite.executeSql("DELETE FROM routines WHERE routine_name = ?", ['current']);
    }

    public getCurrentRoutineFromDb() {
        this.clearCurrentRoutine();
        this.sqlite.queryEachCurrentRoutine("SELECT act_name AS name, duration FROM routines WHERE routine_name = ?", ['current']).then(result => {
            this.currentRoutine = result;
        });
    }

    public saveCurrentRoutineAsName(name: string) {
        if(name == undefined || name == '') {
            return;
        }
        for(let i = 0; i < this.currentRoutine.length; i++) {
            this.sqlite.executeSql(
                "INSERT INTO routines (routine_name, act_name, duration) VALUES (?,?,?)",
                [name, this.currentRoutine[i].name, this.currentRoutine[i].duration]
            );
        }
        return;
    }

    private setTotalDuration() {
        let duration = 0;
        this.currentRoutine.forEach(item => {
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

    public clearCurrentRoutine(clearFromDb?) {
        if(clearFromDb) {
            this.clearCurrentRoutineFromDb();
        }
        this.currentRoutine.length = 0;
        this.totalDuration = 0;
    }

    public getSavedRoutines() {
        this.sqlite.queryEachSavedRoutines(
            "SELECT id, routine_name, act_name, duration FROM routines WHERE NOT routine_name = 'current'",
            [])
            .then(result => {
            this.savedRoutines = result;
            console.log(this.savedRoutines);
        });
    }

}
