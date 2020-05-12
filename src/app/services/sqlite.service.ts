import { Injectable } from '@angular/core';
var Sqlite = require("nativescript-sqlite");

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

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
}
