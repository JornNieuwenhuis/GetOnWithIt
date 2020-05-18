import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {

    public orientation: string = "portrait";

    constructor() { }

      //TODO: Add function to set orientation!
}
