import { Moment } from 'moment';
import { SlotType } from './slot-type';

export interface Time {
    start: Moment;
    end: Moment;
    type: SlotType;
}
