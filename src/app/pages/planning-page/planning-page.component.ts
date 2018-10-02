import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Moment, parseZone } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { Barcamp } from '../../models/barcamp';
import { SlotType } from '../../models/slot-type';
import { Time } from '../../models/time';
import { AddDay, AddRoom, AddTimeSlot, EditRoom, EditTimeSlot } from '../../state/planning/planning.actions';
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
    days: Observable<Moment[]>;

    @Select(PlanningState.times)
    times: Observable<Time[]>;

    @Select(PlanningState.rooms)
    rooms: Observable<string[]>;

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
        const days = this.store.selectSnapshot(PlanningState.days);
        const lastDay = days[days.length - 1];
        const newDay = lastDay ? lastDay.clone().add(1, 'day') : parseZone();
        this.store.dispatch(new AddDay(newDay));
    }

    addRoom() {
        this.store.dispatch(
            new AddRoom(`Room ${this.store.selectSnapshot(state => state.planning.rooms).length + 1}`)
        );
    }

    addTime() {
        const times: Time[] = this.store.selectSnapshot(state => state.planning.times);
        const latestTime = times[times.length - 1];

        this.store.dispatch(new AddTimeSlot({
            start: latestTime
                ? latestTime.end.clone().add(15, 'minute')
                : parseZone().local().startOf('hour').hours(9),
            end: latestTime
                ? latestTime.end.clone().add(1, 'hour')
                : parseZone().local().startOf('hour').hours(10),
            type: SlotType.TOPIC
        }));
    }

    roomNameChange(event: any, roomName: string, roomIndex: number) {
        const newName = event.target.innerText;
        if (newName && newName !== roomName) {
            this.store.dispatch(new EditRoom({ roomIndex, newName }));
        }
    }

    startTimeChange(event: any, { start, ...rest }: Time, timeSlotIndex: number) {
        console.log(start);
        const time = parseZone(event.target.innerText, 'H:mm').local();
        console.log(time);
        if (time && !time.isSame(start)) {
            this.store.dispatch(new EditTimeSlot({ timeSlotIndex, newTime: { start: time, ...rest } }));
        }
    }
}
