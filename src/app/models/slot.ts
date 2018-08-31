import { Moment } from 'moment';
import { SlotType } from './slot-type';
import { Time } from './time';
import { Topic } from './topic';

export interface Slot {
    day: Moment;
    room: string;
    time: Time;
    topic?: Topic;
}

interface Timeplan {
    [t: string]: Slot;
}

interface Timetable {
    [d: string]: Timeplan;
}
