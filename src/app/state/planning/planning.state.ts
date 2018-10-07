import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { groupBy } from 'lodash-es';
import { Moment, utc } from 'moment';
import { Barcamp } from '../../models/barcamp';
import { Slot } from '../../models/slot';
import { Time } from '../../models/time';
import { Topic } from '../../models/topic';
<<<<<<< HEAD
import { AddDay, AddRoom, AddTimeSlot, AddTopic, EditDay, EditRoom, EditTimeSlot, RemoveTopic, AttachTopic } from './planning.actions';
=======
import { AddDay, AddRoom, AddTimeSlot, AddTopic, EditRoom, EditTimeSlot, RemoveTopic } from './planning.actions';
>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4

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
            id: '750102fb-9386-476a-9b1a-0a2b83a1e33',
            title: 'Thing Q3',
            organizer: 'ASD',
            participants: [],
        },
        topics: [],
        days: [], // utc('2018-08-01'), utc('2018-08-02'), utc('2018-08-03')
        rooms: [], // 'Raum 1', 'Raum 2', 'Raum 3'
        times: [], // {start: utc('10:00', 'hh:mm'), end: utc('11:00', 'hh:mm'), type: SlotType.TOPIC}
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
        return state.days.sort((day1, day2) => day1.diff(day2));
    }

    @Selector()
    static rooms(state: PlanningStateModel) {
        return state.rooms;
    }

    @Selector()
    static times(state: PlanningStateModel) {
        return state.times;
    }

    @Selector()
    static slots(state: PlanningStateModel) {
        return state.slots;
    }

    @Selector()
    static slotIds(state: PlanningStateModel) {
        console.log(state.slots);
        return state.slots.map((_, index: number) => `slot-${index}`);
    }

    @Action(AddTopic)
    addTopic({ getState, patchState }: StateContext<PlanningStateModel>, action: AddTopic) {
        patchState({ topics: [...getState().topics, action.payload] });
    }

    @Action(RemoveTopic)
    removeTopic({ getState, patchState }: StateContext<PlanningStateModel>, { payload }: RemoveTopic) {
        patchState({ topics: getState().topics.filter((topic: Topic) => topic.title !== payload.title) });
    }

    @Action(AddDay)
    addDay({ getState, patchState }: StateContext<PlanningStateModel>, { payload }: AddDay) {
        const { days, rooms, times, slots } = getState();
        const newDay = typeof payload === 'string' ? utc(payload) : payload;
        if (days.some((day: Moment) => day.isSame(newDay, 'day'))) {
            console.warn('This day already exists');
        }

        let missingSlots = [];
        if (rooms.length && times.length) {
            missingSlots = this.createMissingSlotsForDay(rooms, times, payload);
            console.log('missing day slots', missingSlots);
        }

<<<<<<< HEAD
        patchState({ days: [...days, newDay], slots: [...slots, ...missingSlots] });
    }

    @Action(EditDay)
    editDay({ getState, patchState }: StateContext<PlanningStateModel>, { payload: { dayIndex, newDay } }: EditDay) {
        const { days } = getState();
        newDay = typeof newDay === 'string' ? utc(newDay) : newDay;
        if (days.some((day: Moment) => day.isSame(newDay, 'day'))) {
            console.warn('This day already exists');
        }

        days[dayIndex] = newDay;
        patchState({ days: [...days] });
=======
        let missingSlots = [];
        if (days.length && rooms.length && times.length) {
            missingSlots = this.createMissingSlotsForDay(rooms, times, payload);
        }

        patchState({ days: [...days, newDay], slots: [...slots, ...missingSlots] });
>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4
    }

    @Action(AddRoom)
    addRoom({ getState, patchState }: StateContext<PlanningStateModel>, { payload }: AddRoom) {
        const { days, rooms, times, slots } = getState();
        if (rooms.some((room: string) => room === payload)) {
            console.warn('This room already exists');
        }

        let missingSlots = [];
        if (days.length && times.length) {
            missingSlots = this.createMissingSlotsForRoom(days, times, payload);
            console.log('missing room slots', missingSlots);
        }

<<<<<<< HEAD
        patchState({ rooms: [...rooms, payload], slots: [...slots, ...missingSlots] });
    }

    @Action(EditRoom)
    editRoom({ getState, patchState }: StateContext<PlanningStateModel>, { payload: { roomIndex, newName } }: EditRoom) {
        const { rooms } = getState();

        if (rooms.some((room: string) => room === newName)) {
            console.warn('This room already exists');
        }

=======
        let missingSlots = [];
        if (days.length && rooms.length && times.length) {
            missingSlots = this.createMissingSlotsForRoom(days, times, payload);
        }

        patchState({ rooms: [...rooms, payload], slots: [...slots, ...missingSlots] });
    }

    @Action(EditRoom)
    editRoom({ getState, patchState }: StateContext<PlanningStateModel>, { payload: { roomIndex, newName } }: EditRoom) {
        const { rooms } = getState();

        if (rooms.some((room: string) => room === newName)) {
            throw new Error('This room already exists');
        }

>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4
        rooms[roomIndex] = newName;
        patchState({ rooms: [...rooms] });
    }

    @Action(AddTimeSlot)
    addTimeSlot({ getState, patchState }: StateContext<PlanningStateModel>, { payload }: AddTimeSlot) {
        const { days, rooms, times, slots } = getState();
        payload.start = utc(payload.start);
        payload.end = utc(payload.end);
<<<<<<< HEAD
=======
        console.log(payload.start);
>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4

        if (times.some((time: Time) => {
            return payload.start.isBetween(time.start, time.end, 'minutes', '[)')
                || payload.end.isBetween(time.start, time.end, 'minutes', '(]');
        })) {
            console.warn('This time intersects another time');
<<<<<<< HEAD
        }

        let missingSlots = [];
        if (days.length && rooms.length) {
            missingSlots = this.createMissingSlotsForTime(days, rooms, payload);
            console.log('missing time slots', missingSlots);
        }

=======
        }

        let missingSlots = [];
        if (days.length && rooms.length && times.length) {
            missingSlots = this.createMissingSlotsForTime(days, rooms, payload);
        }

>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4
        patchState({ times: [...times, payload], slots: [...slots, ...missingSlots] });
    }

    @Action(EditTimeSlot)
    editTimeSlot({ getState, patchState }: StateContext<PlanningStateModel>, { payload: { timeSlotIndex, newTime } }: EditTimeSlot) {
        const { times } = getState();
        newTime.start = utc(newTime.start);
        newTime.end = utc(newTime.end);

        const collides = times
            .filter((time: Time, index: number) => index !== timeSlotIndex)
            .some((time: Time) => {
                return newTime.start.isBetween(time.start, time.end, 'minutes', '[)')
                    || newTime.end.isBetween(time.start, time.end, 'minutes', '(]');
            });

        if (collides) {
            console.warn('This time intersects another time');
        }

        times[timeSlotIndex] = newTime;
        patchState({ times: [...times] });
<<<<<<< HEAD
    }

    @Action(AttachTopic)
    AttachTopic({ getState, patchState }: StateContext<PlanningStateModel>, { payload: { topic, slotIndex } }: AttachTopic) {
        const { slots } = getState();
        slots[slotIndex].topic = topic;
        patchState({ slots });
=======
>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4
    }

    private createMissingSlotsForDay(rooms: string[], times: Time[], day: Moment): Slot[] {
        const slots = [];
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
        return slots;
    }

    private createMissingSlotsForRoom(days: Moment[], times: Time[], room: string): Slot[] {
        const slots = [];
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
        return slots;
    }

    private createMissingSlotsForTime(days: Moment[], rooms: string[], time: Time): Slot[] {
        const slots = [];
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
        return slots;
    }
}
