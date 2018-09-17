import { Moment } from 'moment';
import { Time } from '../../models/time';
import { Topic } from '../../models/topic';
import { Broadcast } from '../stomp/stomp.plugin';

@Broadcast('/topics')
export class AddTopic {
    static readonly type = '[Planning] Add Topic';

    constructor(public payload: Topic) {
    }
}

@Broadcast('/topics')
export class RemoveTopic {
    static readonly type = '[Planning] Remove Topic';

    constructor(public payload: Topic) {
    }
}

@Broadcast('/topics')
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

@Broadcast('/topics')
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

@Broadcast('/topics')
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
