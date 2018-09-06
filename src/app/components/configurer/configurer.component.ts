import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { StompSubscription } from '@stomp/stompjs';
import { Moment, utc } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { Barcamp } from '../../models/barcamp';
import { SlotType } from '../../models/slot-type';
import { Time } from '../../models/time';
import { Topic } from '../../models/topic';
import { AddDay, AddTopic } from '../../state/planning/planning.actions';
import { PlanningState } from '../../state/planning/planning.state';
import { StompSubscribe } from '../../state/stomp/stomp.actions';

@Component({
    selector: 'th-configurer',
    templateUrl: './configurer.component.html',
    styleUrls: ['./configurer.component.scss']
})
export class ConfigurerComponent implements OnInit, OnDestroy {

    SlotType = SlotType;

    @Select(PlanningState.barcamp)
    barcamp: Observable<Barcamp>;

    @Select(PlanningState.topics)
    topics: Observable<Topic[]>;

    @Select(PlanningState.days)
    days: Observable<Moment>;

    @Select(PlanningState.times)
    times: Observable<Time>;

    @Select(PlanningState.rooms)
    rooms: Observable<string>;

    dayForm: FormGroup;

    topicForm: FormGroup;

    topicSubscription: StompSubscription;

    constructor(private fb: FormBuilder,
                private changeDetector: ChangeDetectorRef,
                private store: Store) {
        this.dayForm = fb.group({
            dayCtrl: new FormControl('', [Validators.required])
        });
        this.topicForm = fb.group({
            topicCtrl: new FormControl('', [Validators.required])
        });
    }

    addDay() {
        const day = utc(this.dayForm.get('dayCtrl').value);
        this.store.dispatch(new AddDay(day));
        this.dayForm.setValue({ dayCtrl: day.clone().add(1, 'day').format('YYYY-MM-DD') });
    }

    addTopic() {
        const topic = this.topicForm.get('topicCtrl').value;
        this.store.dispatch(new AddTopic({ title: topic, pilot: 'SRO', votes: [] }));
    }

    ngOnInit() {
        this.store.dispatch(new StompSubscribe({ queueName: '/topics/initial' }));
        this.store.dispatch(new StompSubscribe({ queueName: '/topics/stream' }));
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }

}
