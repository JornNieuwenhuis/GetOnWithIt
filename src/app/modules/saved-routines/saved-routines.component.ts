import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RoutineService } from '~/app/services/routine.service';
import { RoutingService } from '~/app/services/routing.service';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { DialogPreviewComponent } from '~/app/util/modal-dialog/dialog-preview/dialog-preview.component';

@Component({
  selector: 'ns-saved-routines',
  templateUrl: './saved-routines.component.html',
  styleUrls: ['./saved-routines.component.css']
})
export class SavedRoutinesComponent implements OnInit {

	constructor(
        public routineService: RoutineService,
        private routing: RoutingService,
        private modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef) { }

	ngOnInit(): void {
        this.routineService.getSavedRoutines();
	}

  	public getString(duration, name) {
		if(name == 'break') {
			return 'break';
		}
		return duration + ' ' + name;
    }

    public setAsCurrentRoutine(routineName) {
        let options: ModalDialogOptions = {
            context: {
                prompt: "Load this routine?",
                type: "routinePreview",
                activities: this.routineService.getActivitiesFromSavedRoutines(routineName)
            },
            viewContainerRef: this.viewContainerRef
        };

        this.modalService.showModal(DialogPreviewComponent, options).then((result: string) => {
                if(result === 'ok') {
                    this.routineService.setAsCurrentRoutine(routineName);
                    //Timeout fixes issue where modal is still displayed after navigation
                    setTimeout(() => {
                        this.routing.navigateToUrl('/countdowntimer');
                    }, 1);
                }
                if(result === 'delete') {
                    this.routineService.deleteRoutineFromDb(routineName);
                }
            }
        );
    }
}
