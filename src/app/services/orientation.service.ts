import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {

    public orientation: string = "portrait";
    private application=require('application');

    constructor() { }

    //TODO: Add function to set orientation!
}
