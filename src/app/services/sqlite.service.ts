import { Injectable } from '@angular/core';
var Sqlite = require("nativescript-sqlite");

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

    //TODO: improve this workaround
    public currentRoutine = [];
    public savedRoutines  = [];
    public activeRoutine  = [];

    /* https://medium.com/@kumarandena/nativescript-groceries-app-using-sqlite-1018df947601 */

    constructor() { }

    public getDbConnection() {
        return new Sqlite('activities');
    }

    public closeDbConnection() {
            new Sqlite('activities')
            .then((db) => {
            db.close();
        });
    }

    public getAll(table: String) {
        let promise = new Promise((resolve, reject) => {
        let query = "SELECT * FROM " + table;
        this.getDbConnection().then(db => {
            db.all(query)
            .then(
                result => { // Success
                    resolve(result);
                },
                reject => { // Fail
                    console.log(reject);
                }
            )
        });
    });
        return promise;
    }

    public executeSql(statement: String, variables: Array<any>) {
        let promise = new Promise((resolve, reject) => {
            this.getDbConnection().then(db => {
                db.execSQL(statement, variables)
                .then(
                    result => { // Success
                        resolve(result);
                    },
                    reject => { // Fail
                        console.log(reject);
                    }
                )
            });
        });
        return promise;
    }

    public rawQuery(query, params) {
        let promise = new Promise((resolve, reject) => {
        this.getDbConnection().then(db => {
            db.all(query, params)
            .then(
                result => { // Success
                    resolve(result);
                },
                reject => { // Fail
                    console.log(reject);
                }
            )
        });
    });
        return promise;
    }

    public queryEachCurrentRoutine(query, params) {
        this.currentRoutine = [];
        let promise = new Promise((resolve, reject) => {
        this.getDbConnection().then(db => {
            db.each(query, params, this.getCurrentRoutineFromDbCallback.bind(this), null, null)
            .then(
                result => { // Success
                    result = this.currentRoutine;
                    resolve(result);
                },
                reject => { // Fail
                    console.log(reject);
                }
            )});
        });
        return promise;
    }

    public getCurrentRoutineFromDbCallback(unused, data) {
        this.currentRoutine.push({ 'name': data[0], 'duration': data[1] });
    }

    public queryEachSavedRoutines(query, params) {
        this.savedRoutines = [];
        let promise = new Promise((resolve, reject) => {
        this.getDbConnection().then(db => {
            db.each(query, params, this.getSavedRoutinesCallback.bind(this), null, null)
            .then(
                result => { // Success
                    result = this.savedRoutines;
                    resolve(result);
                },
                reject => { // Fail
                    console.log(reject);
                }
            )});
        });
        return promise;
    }

    public getSavedRoutinesCallback(unused, data) {
        if(!data) return;
        let routineName = data[1];
        if (!this.savedRoutines.find(o => o.routineName === routineName)) {
            this.savedRoutines.push({'routineName': data[1], 'activities': []});
        }

        this.savedRoutines.forEach(routine => {
            if(routine.routineName == routineName) {
                routine.activities.push(
                    {
                        'id': data[0],
                        'name': data[2],
                        'duration': data[3]
                    }
                );
            }
        });
    }

    public queryEachActiveRoutineTitle(query, params) {
        let promise = new Promise((resolve, reject) => {
        this.getDbConnection().then(db => {
            db.each(query, params, this.queryEachActiveRoutineTitleCallback.bind(this), null, null)
            .then(
                result => { // Success
                    result = this.activeRoutine;
                    resolve(result);
                },
                reject => { // Fail
                    console.log(reject);
                }
            )});
        });
        return promise;
    }

    private queryEachActiveRoutineTitleCallback(unused, data) {
        this.activeRoutine = data[0];
    }

}
