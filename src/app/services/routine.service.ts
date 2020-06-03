import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

    public currentRoutine: any = [];
    public currentRoutineTitle: any;
    public totalDuration = 0;

    public savedRoutines: any = [];

    public running: boolean = false;

    public activities;

    public durations = {
        'break': { 'seconds': 10 },
        '30s': { 'seconds': 30, 'middleMark': 15, 'urgentMark': 5, 'changeSides': false },
        '60s': { 'seconds': 60, 'middleMark': 30, 'urgentMark': 10, 'changeSides': false },
        '60sLR': { 'seconds': 60, 'middleMark': 30, 'urgentMark': 10, 'changeSides': true }
    }

    constructor(private sqlite: SqliteService) {
        this.getAllActivities();
        this.getActiveRoutineTitle().then(result => {
            this.currentRoutineTitle = (result == null || result == '') ? "Untitled routine" : result;
        });
    }

    public addToRoutine(duration: String, name: String) {
        this.currentRoutine.push({'duration': duration, 'name': name});
        this.setTotalDuration();
        this.currentRoutineTitle = "Untitled routine";
        this.clearActiveRoutines();
        return this.saveCurrentRoutine();
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
        //TODO: find better solution. Sqlite has limited possibilities for queries, still looking for way to update single items in DB
        return this.clearCurrentRoutineFromDb().then(() => {
            for(let i = 0; i < this.currentRoutine.length; i++) {
                this.sqlite.executeSql(
                    "INSERT INTO routines (routine_name, act_name, duration) VALUES (?,?,?)",
                    ['current', this.currentRoutine[i].name, this.currentRoutine[i].duration]
                );
            }
        });
    }

    public clearCurrentRoutineFromDb() {
        this.clearActiveRoutines();
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
        this.currentRoutineTitle = name;
        this.clearActiveRoutines().then(() => {
            for(let i = 0; i < this.currentRoutine.length; i++) {
                this.sqlite.executeSql(
                    "INSERT INTO routines (routine_name, act_name, duration, active) VALUES (?,?,?,?)",
                    [name, this.currentRoutine[i].name, this.currentRoutine[i].duration, 1]
                );
            }
        });
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
        return this.sqlite.queryEachSavedRoutines(
            "SELECT id, routine_name, act_name, duration, active FROM routines WHERE NOT routine_name = 'current'",
            [])
            .then(result => {
            this.savedRoutines = result;
            return result;
        });
    }

    public setAsCurrentRoutine(routineName: string) {
        this.currentRoutineTitle = routineName;
        this.currentRoutine = this.getActivitiesFromSavedRoutines(routineName);
        this.setAsActiveRoutine(routineName);
        return this.saveCurrentRoutine();
    }

    public getActivitiesFromSavedRoutines(routineName: string) {
        for(let i = 0; i < this.savedRoutines.length; i++) {
            if(this.savedRoutines[i]['routineName'] === routineName) {
                return this.savedRoutines[i]['activities'];
            }
        }
    }

    public deleteRoutineFromDb(routineName) {
        return this.sqlite.executeSql("DELETE FROM routines WHERE routine_name = ?", [routineName]).then(() => {
            this.getSavedRoutines();
        });
    }

    public updateExistingRoutine(routineName) {
        this.deleteRoutineFromDb(routineName).then(() => {
            return this.saveCurrentRoutineAsName(routineName);
        });
    }

    private setAsActiveRoutine(routineName) {
        return this.clearActiveRoutines().then(() => {
            this.sqlite.executeSql("UPDATE routines SET active = 1 WHERE routine_name = ?", [routineName]);
        });
    }

    private clearActiveRoutines() {
        return this.sqlite.executeSql("UPDATE routines SET active = 0", []);
    }

    private getActiveRoutineTitle() {
        return this.sqlite.queryEachActiveRoutineTitle("SELECT routine_name FROM routines WHERE active = 1",[]);
    }

    public removeIndexFromCurrentRoutine(index) {
        this.currentRoutine.splice(index, 1);
        return this.saveCurrentRoutine();
    }

    public checkChangeSide(durationName) {
        return this.durations[durationName]['changeSides'];
    }

}
