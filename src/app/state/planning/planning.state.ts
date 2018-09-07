import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { groupBy } from 'lodash-es';
import { Moment, utc } from 'moment';
import { Barcamp } from '../../models/barcamp';
import { Slot } from '../../models/slot';
import { Time } from '../../models/time';
import { Topic } from '../../models/topic';
import { AddDay, AddRoom, AddTimeSlot, AddTopic } from './planning.actions';

export interface PlanningStateModel {
    barcamp: Barcamp;
    topics: Topic[];
    days: Moment[];
    rooms: string[];
    times: Time[];
    slots: Slot[];
}

@State<PlanningStateModel>({
    name: 'planning',
    defaults: {
        barcamp: {
            id: '750102fb-9386-476a-9b1a-0ae2b83a1e33',
            title: 'Thing Q3',
            organizer: 'ASD',
            participants: [],
        },
        topics: [],
        days: [utc('2018-08-01'), utc('2018-08-02'), utc('2018-08-03')], // utc('2018-08-01'), utc('2018-08-02'), utc('2018-08-03')
        rooms: [], // 'Raum 1', 'Raum 2', 'Raum 3'
        times: [],
        slots: []
    }
})
export class PlanningState {

    @Selector()
    static barcamp(state: PlanningStateModel) {
        return state.barcamp;
    }

    @Selector()
    static topics(state: PlanningStateModel) {
        return state.topics;
    }

    @Selector()
    static days(state: PlanningStateModel) {
        return state.days;
    }

    @Selector()
    static rooms(state: PlanningStateModel) {
        return state.rooms;
    }

    @Selector()
    static times(state: PlanningStateModel) {
        return state.times;
    }

    static timetable(day: Moment) {
        return createSelector([PlanningState], (state: PlanningStateModel) => {
            return groupBy(
                state.slots.filter((slot: Slot) => slot.day.isSame(day)),
                (slot: Slot) => slot.time.start.format('H:mm')
            );
        });
    }

    @Action(AddTopic)
    addTopic({ dispatch, getState, patchState }: StateContext<PlanningStateModel>, action: AddTopic) {
        patchState({ topics: [...getState().topics, action.payload] });
    }

    @Action(AddDay)
    addDay({ getState, patchState }: StateContext<PlanningStateModel>, { payload }: AddDay) {
        const { days, rooms, times, slots } = getState();
        if (days.some((day: Moment) => day.isSame(payload, 'day'))) {
            throw new Error('This day already exists');
        }

        if (days.length && rooms.length && times.length) {
            this.createMissingSlotsForDay(slots, rooms, times, payload);
        }

        patchState({ days: [...days, payload], slots: [...slots] });
    }

    @Action(AddRoom)
    addRoom({ getState, patchState }: StateContext<PlanningStateModel>, { payload }: AddRoom) {
        const { days, rooms, times, slots } = getState();
        if (rooms.some((room: string) => room === payload)) {
            throw new Error('This room already exists');
        }

        if (days.length && rooms.length && times.length) {
            this.createMissingSlotsForRoom(slots, days, times, payload);
        }

        patchState({ rooms: [...rooms, payload], slots: [...slots] });
    }

    @Action(AddTimeSlot)
    addTimeSlot({ getState, patchState }: StateContext<PlanningStateModel>, { payload }: AddTimeSlot) {
        const { days, rooms, times, slots } = getState();
        if (times.some((time: Time) => {
            return payload.start.isBetween(time.start, time.end, 'minutes', '[)')
                || payload.end.isBetween(time.start, time.end, 'minutes', '(]');
        })) {
            throw new Error('This time intersects another time');
        }

        if (days.length && rooms.length && times.length) {
            this.createMissingSlotsForTime(slots, days, rooms, payload);
        }

        patchState({ times: [...times, payload], slots: [...slots] });
    }

    private createMissingSlotsForDay(slots: Slot[], rooms: string[], times: Time[], day: Moment) {
        rooms.forEach((room: string) => {
            times.forEach((time: Time) => {
                const slot: Slot = {
                    day,
                    room,
                    time,
                };
                slots.push(slot);
            });
        });
    }

    private createMissingSlotsForRoom(slots: Slot[], days: Moment[], times: Time[], room: string) {
        days.forEach((day: Moment) => {
            times.forEach((time: Time) => {
                const slot: Slot = {
                    day,
                    room,
                    time,
                };
                slots.push(slot);
            });
        });
    }

    private createMissingSlotsForTime(slots: Slot[], days: Moment[], rooms: string[], time: Time) {
        days.forEach((day: Moment) => {
            rooms.forEach((room: string) => {
                const slot: Slot = {
                    day,
                    room,
                    time,
                };
                slots.push(slot);
            });
        });
    }
}
