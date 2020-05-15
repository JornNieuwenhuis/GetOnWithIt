import { Injectable } from '@angular/core';
var Sqlite = require("nativescript-sqlite");

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

    /* https://medium.com/@kumarandena/nativescript-groceries-app-using-sqlite-1018df947601 */

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

}
