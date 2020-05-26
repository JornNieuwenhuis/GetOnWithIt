import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {

    public orientation;
    private application = require('application');
    private activity;


    constructor() {
        this.activity = this.application.android.foregroundActivity;
        this.orientation = this.activity.getResources().getConfiguration().orientation == 2 ? "landscape" : "portrait";
    }

    //TODO: Add function to set orientation!
}
