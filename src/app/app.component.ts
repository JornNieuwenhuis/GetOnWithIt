import { Component, ChangeDetectorRef } from "@angular/core";
import { SqliteService } from "./services/sqlite.service";
import { OrientationService } from "./services/orientation.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(private sqliteService: SqliteService, private orientationService: OrientationService, private changeDetRef: ChangeDetectorRef) {

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

    public orientationChanged(orientation) {
        this.orientationService.orientation = orientation;
        this.changeDetRef.detectChanges();
        console.log(this.orientationService.orientation);

    }

}
