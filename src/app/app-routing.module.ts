import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { CountdownTimerComponent } from "./modules/countdown-timer/countdown-timer.component";
import { CreateARoutineComponent } from "./modules/create-a-routine/create-a-routine.component";
import { SavedRoutinesComponent } from "./modules/saved-routines/saved-routines.component";
import { MenuComponent } from "./modules/menu/menu.component";

const routes: Routes = [
    { path: "", redirectTo: "/menu", pathMatch: "full" },
    { path: "menu", component: MenuComponent },
    { path: "countdowntimer", component: CountdownTimerComponent },
    { path: "createARoutine", component: CreateARoutineComponent },
    { path: "savedRoutines", component: SavedRoutinesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
