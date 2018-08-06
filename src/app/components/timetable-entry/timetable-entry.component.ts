import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'th-timetable-entry',
    templateUrl: './timetable-entry.component.html',
    styleUrls: ['./timetable-entry.component.scss']
})
export class TimetableEntryComponent {

    @HostBinding('class.column')
    columnClass = true;

    constructor() {
    }

}
