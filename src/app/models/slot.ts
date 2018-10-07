import { Moment } from 'moment';
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
