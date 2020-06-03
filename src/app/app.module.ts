import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { CountdownTimerComponent } from './modules/countdown-timer/countdown-timer.component';
import { HideActionBarDirective } from './directives/hide-action-bar.directive';
import { MenuComponent } from './modules/menu/menu.component';
import { CreateARoutineComponent } from './modules/create-a-routine/create-a-routine.component';
import { SavedRoutinesComponent } from './modules/saved-routines/saved-routines.component';
import { OrientationDirective } from './directives/orientation.directive';
import { DialogPreviewComponent } from './util/modal-dialog/dialog-preview/dialog-preview.component';
import { DialogSaveRoutineComponent } from "./util/modal-dialog/dialog-save-routine/dialog-save-routine.component";
import { AudioHandlerDirective } from './directives/audio-handler.directive';
import { DeselectDirective } from './directives/deselect.directive';

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CountdownTimerComponent,
        HideActionBarDirective,
        MenuComponent,
        CreateARoutineComponent,
        SavedRoutinesComponent,
        OrientationDirective,
        DialogPreviewComponent,
        DialogSaveRoutineComponent,
        AudioHandlerDirective,
        DeselectDirective
    ],
    entryComponents: [DialogPreviewComponent, DialogSaveRoutineComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
