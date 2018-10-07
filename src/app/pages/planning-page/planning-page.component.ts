import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Moment, utc } from 'moment';
import { Observable } from 'rxjs';
import { Barcamp } from '../../models/barcamp';
import { SlotType } from '../../models/slot-type';
import { Time } from '../../models/time';
import { AddDay, AddRoom, AddTimeSlot, EditRoom, EditTimeSlot, EditDay, AttachTopic } from '../../state/planning/planning.actions';
import { PlanningState } from '../../state/planning/planning.state';
import { StompSubscribe } from '../../state/stomp/stomp.actions';
import { Slot } from '../../models/slot';
import { map, filter } from 'rxjs/operators';
import { Topic } from '../../models/topic';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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

    @Select(PlanningState.slots)
    slots: Observable<Slot[]>;

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

    findTopic(day: Moment, room: string, time: Time): Observable<Topic> {
        return this.slots.pipe(
            map((slots: Slot[]) => slots.find((slot: Slot) => {
                return day.isSame(slot.day, 'day')
                    && room === slot.room
                    && time.start.isSame(slot.time.start, 'minute')
                    && time.end.isSame(slot.time.end, 'minute');
            })),
            filter((slot: Slot) => !!slot),
            map((slot: Slot) => slot.topic)
        );
    }

    findSlotId(day: Moment, room: string, time: Time): Observable<string> {
        return this.slots.pipe(
            map((slots: Slot[]) => slots.findIndex((slot: Slot) => {
                return day.isSame(slot.day, 'day')
                    && room === slot.room
                    && time.start.isSame(slot.time.start, 'minute')
                    && time.end.isSame(slot.time.end, 'minute');
            })),
            map((index: number) => `slot-${index}`)
        );
    }

    topicDropped(dropEvent: CdkDragDrop<Topic[]>) {
        console.log(dropEvent);
        const { container, previousContainer, previousIndex } = dropEvent;
        const slotIndex = Number.parseInt(container.id.substr(5));
        const topic = previousContainer.data[previousIndex];
        this.store.dispatch(new AttachTopic({ topic, slotIndex }));
    }

    addDay() {
        const days = this.store.selectSnapshot(PlanningState.days);
        const lastDay = days[days.length - 1];
        const newDay = lastDay ? lastDay.clone().add(1, 'day') : utc();
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
                : utc().startOf('hour').hours(9),
            end: latestTime
                ? latestTime.end.clone().add(1, 'hour')
                : utc().startOf('hour').hours(10),
            type: SlotType.TOPIC
        }));
    }

    dayChange(event: any, day: Moment, dayIndex: number) {
        const newDay = utc(event.target.innerText, 'DD.MM');
        newDay.year(day.get('year'));
        if (newDay && !newDay.isSame(day, 'day')) {
            this.store.dispatch(new EditDay({ dayIndex, newDay }));
        }
    }

    roomNameChange(event: any, roomName: string, roomIndex: number) {
        const newName = event.target.innerText;
        if (newName && newName !== roomName) {
            this.store.dispatch(new EditRoom({ roomIndex, newName }));
        }
    }

    startTimeChange(event: any, { start, ...rest }: Time, timeSlotIndex: number) {
        const time = utc(event.target.innerText, 'H:mm');
        if (time && !time.isSame(start, 'minute')) {
            this.store.dispatch(new EditTimeSlot({ timeSlotIndex, newTime: { start: time, ...rest } }));
        }
    }

    endTimeChange(event: any, { end, ...rest }: Time, timeSlotIndex: number) {
        const time = utc(event.target.innerText, 'H:mm').local();
        if (time && !time.isSame(end, 'minute')) {
            this.store.dispatch(new EditTimeSlot({ timeSlotIndex, newTime: { end: time, ...rest } }));
        }
    }
}
