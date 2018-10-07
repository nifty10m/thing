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

@Broadcast('/days')
export class AddDay {
    static readonly type = '[Planning] Add Day';

    constructor(public payload: Moment) {
    }
}

@Broadcast('/days')
export class RemoveDay {
    static readonly type = '[Planning] Remove Day';

    constructor(public payload: Moment) {
    }
}

<<<<<<< HEAD
@Broadcast('/days')
export class EditDay {
    static readonly type = '[Planning] Edit Day';

    constructor(public payload: { dayIndex: number, newDay: Moment }) {
    }
}

=======
>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4
@Broadcast('/rooms')
export class AddRoom {
    static readonly type = '[Planning] Add Room';

    constructor(public payload: string) {
    }
}

@Broadcast('/rooms')
export class RemoveRoom {
    static readonly type = '[Planning] Remove Room';

    constructor(public payload: string) {
    }
}

@Broadcast('/rooms')
export class EditRoom {
    static readonly type = '[Planning] Edit Room';

    constructor(public payload: { roomIndex: number, newName: string }) {
    }
}

@Broadcast('/timeslots')
export class AddTimeSlot {
    static readonly type = '[Planning] Add Timeslot';

    constructor(public payload: Time) {
    }
}

@Broadcast('/timeslots')
export class RemoveTimeSlot {
    static readonly type = '[Planning] Remove Timeslot';

    constructor(public payload: Time) {
    }
}

@Broadcast('/timeslots')
export class EditTimeSlot {
    static readonly type = '[Planning] Edit Timeslot';

    constructor(public payload: { timeSlotIndex: number, newTime: Time }) {
    }
}
<<<<<<< HEAD

export class AttachTopic {
    static readonly type = '[Planning] Attach to Slot';

    constructor(public payload: { topic: Topic, slotIndex: number }) {
    }
}
=======
>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4
