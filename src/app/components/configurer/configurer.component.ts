import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { HTML5_FMT, Moment, now, parseZone, utc } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { Barcamp } from '../../models/barcamp';
import { SlotType } from '../../models/slot-type';
import { Time } from '../../models/time';
import { AddDay, AddRoom, AddTimeSlot } from '../../state/planning.actions';
import { PlanningState } from '../../state/planning.state';

@Component({
    selector: 'th-configurer',
    templateUrl: './configurer.component.html',
    styleUrls: ['./configurer.component.scss']
})
export class ConfigurerComponent {

    SlotType = SlotType;

    @Select(PlanningState.barcamp)
    barcamp: Observable<Barcamp>;

    @Select(PlanningState.days)
    days: Observable<Moment>;

    @Select(PlanningState.times)
    times: Observable<Time>;

    @Select(PlanningState.rooms)
    rooms: Observable<string>;

    dayForm: FormGroup;

    roomForm: FormGroup;

    timeForm: FormGroup;

    constructor(private fb: FormBuilder,
                private store: Store) {
        this.dayForm = fb.group({
            dayCtrl: new FormControl('', [Validators.required])
        });
        this.roomForm = fb.group({
            roomCtrl: new FormControl('', [Validators.required])
        });
        this.timeForm = fb.group({
            startCtrl: new FormControl('00:00', [Validators.required]),
            endCtrl: new FormControl('01:00', [Validators.required]),
            typeCtrl: new FormControl(SlotType.TOPIC, [Validators.required]),
        });
    }

    addDay() {
        const day = utc(this.dayForm.get('dayCtrl').value);
        this.store.dispatch(new AddDay(day));
        this.dayForm.setValue({ dayCtrl: day.clone().add(1, 'day').format('YYYY-MM-DD') });
    }

}
