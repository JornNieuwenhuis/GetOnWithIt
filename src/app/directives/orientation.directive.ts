import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[nsOrientation]'
})
export class OrientationDirective {

    @Output() orientationChanged: EventEmitter<any> = new EventEmitter();

    private application=require('application');

	constructor(){
		this.application.on("orientationChanged", this.onOrientationChanged);
	}

	public onOrientationChanged = (event) => {
        this.orientationChanged.emit(event.newValue);
	};

}
