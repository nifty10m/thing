import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Moment, utc } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { Barcamp } from '../../models/barcamp';
import { SlotType } from '../../models/slot-type';
import { Time } from '../../models/time';
import { AddDay, AddRoom, AddTimeSlot } from '../../state/planning.actions';
import { PlanningState } from '../../state/planning.state';

@Component({
    selector: 'th-configuration-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningPageComponent {

    @Select(PlanningState.barcamp)
    barcamp: Observable<Barcamp>;

    @Select(PlanningState.days)
    days: Observable<Moment>;

    @Select(PlanningState.times)
    times: Observable<Time>;

    @Select(PlanningState.rooms)
    rooms: Observable<string>;

    constructor(private store: Store) {
    }

    addDay() {
        const lastDay = this.store.selectSnapshot(PlanningState.days).reverse()[0];
        const newDay = lastDay ? lastDay.clone().add(1, 'day') : utc();
        this.store.dispatch(new AddDay(newDay));
    }

    addRoom() {
        this.store.dispatch(new AddRoom('Testroom'));
    }

    addTime() {
        this.store.dispatch(new AddTimeSlot({
            start: utc().startOf('hour').hours(9),
            end: utc().startOf('hour').hours(10),
            type: SlotType.TOPIC
        }));
    }
}
