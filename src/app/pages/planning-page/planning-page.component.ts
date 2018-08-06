import { Component } from '@angular/core';

@Component({
    selector: 'th-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent {

    eventName = 'Thing Q3';

    days = ['Mon', 'Tue', 'Wed'];

    rooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'];

    slots = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', 'Pause', '13:00 - 14:00'];

    topics = ['Topic 1', '', 'Topic 3', 'Topic 4', 'Topic 5'];

    constructor() {
    }

    onTabSelect(day: string) {
        console.log(day);
    }

}
