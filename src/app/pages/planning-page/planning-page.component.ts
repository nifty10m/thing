import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Moment, utc } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { Barcamp } from '../../models/barcamp';
import { SlotType } from '../../models/slot-type';
import { Time } from '../../models/time';
import { AddDay, AddRoom, AddTimeSlot } from '../../state/planning/planning.actions';
import { PlanningState } from '../../state/planning/planning.state';
import { StompSubscribe } from '../../state/stomp/stomp.actions';

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
        this.store.dispatch([
            new StompSubscribe({ queueName: '/days/initial' }),
            new StompSubscribe({ queueName: '/days/queue' }),
            new StompSubscribe({ queueName: '/rooms/initial' }),
            new StompSubscribe({ queueName: '/rooms/queue' }),
            new StompSubscribe({ queueName: '/timeslots/initial' }),
            new StompSubscribe({ queueName: '/timeslots/queue' }),
        ]);
    }

    addDay() {
        const lastDay = this.store.selectSnapshot(PlanningState.days).reverse()[0];
        const newDay = lastDay ? lastDay.clone().add(1, 'day') : utc();
        this.store.dispatch(new AddDay(newDay));
    }

    addRoom() {
        this.store.dispatch(new AddRoom(`Room ${(Math.random() * 10 % 10).toFixed(0)}`));
    }

    addTime() {
        this.store.dispatch(new AddTimeSlot({
            start: utc().startOf('hour').hours(9),
            end: utc().startOf('hour').hours(10),
            type: SlotType.TOPIC
        }));
    }
}
