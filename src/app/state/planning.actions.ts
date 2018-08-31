import { Moment } from 'moment';
import { Time } from '../models/time';

export class AddDay {
    static readonly type = '[Planning] Add Day';

    constructor(public payload: Moment) {
    }
}

export class RemoveDay {
    static readonly type = '[Planning] Remove Day';

    constructor(public payload: Moment) {
    }
}

export class AddRoom {
    static readonly type = '[Planning] Add Room';

    constructor(public payload: string) {
    }
}

export class RemoveRoom {
    static readonly type = '[Planning] Remove Room';

    constructor(public payload: string) {
    }
}

export class AddTimeSlot {
    static readonly type = '[Planning] Add Timeslot';

    constructor(public payload: Time) {
    }
}

export class RemoveTimeSlot {
    static readonly type = '[Planning] Remove Timeslot';

    constructor(public payload: Time) {
    }
}
