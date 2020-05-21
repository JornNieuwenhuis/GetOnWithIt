import { Component, OnInit } from '@angular/core';
import { RoutineService } from '~/app/services/routine.service';

@Component({
  selector: 'ns-saved-routines',
  templateUrl: './saved-routines.component.html',
  styleUrls: ['./saved-routines.component.css']
})
export class SavedRoutinesComponent implements OnInit {

	constructor(public routineService: RoutineService) { }

	ngOnInit(): void {
        this.routineService.getSavedRoutines();
	}

  	public getString(duration, name) {
		if(name == 'break') {
			return 'break';
		}
		return duration + ' ' + name;
    }
}
