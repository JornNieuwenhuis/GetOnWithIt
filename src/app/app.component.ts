import { Component } from "@angular/core";
import { SqliteService } from "./services/sqlite.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(private sqliteService: SqliteService) {
        this.sqliteService.getDbConnection()
            .then(db => {

                db.execSQL("CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR)").then(() => {
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                });

/*                 db.execSQL("CREATE TABLE IF NOT EXISTS routines (id INTEGER PRIMARY KEY AUTOINCREMENT, act_id INTEGER, duration TEXT)").then(() => {
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                }); */

            });
    }

}
