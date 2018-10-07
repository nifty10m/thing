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
import { AddDay, AddTopic, RemoveTopic } from '../../state/planning/planning.actions';
import { PlanningState } from '../../state/planning/planning.state';
import { StompSubscribe } from '../../state/stomp/stomp.actions';

@Component({
    selector: 'th-configurer',
    templateUrl: './configurer.component.html',
    styleUrls: ['./configurer.component.scss']
})
export class ConfigurerComponent implements OnInit {

    SlotType = SlotType;

    @Select(PlanningState.barcamp)
    barcamp: Observable<Barcamp>;

    @Select(PlanningState.topics)
    topics: Observable<Topic[]>;

    @Select(PlanningState.slotIds)
    slotIds: Observable<string>;

    topicForm: FormGroup;

    constructor(fb: FormBuilder,
                private store: Store) {
        this.topicForm = fb.group({
            topicCtrl: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.store.dispatch(new StompSubscribe({ queueName: '/topics/initial' }));
        this.store.dispatch(new StompSubscribe({ queueName: '/topics/queue' }));
<<<<<<< HEAD
=======
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }

    addDay() {
        const day = utc(this.dayForm.get('dayCtrl').value);
        this.configuredDays.push(day);
        this.dayForm.setValue({ dayCtrl: day.clone().add(1, 'day').format('YYYY-MM-DD') });
    }

    submitConfiguration() {
        this.configuredDays.forEach((day: Moment) => this.store.dispatch(new AddDay(day)));
>>>>>>> 01475ee0d7f3283afd3a7079a36e8acc8eade7a4
    }

    addTopic() {
        const topic = this.topicForm.get('topicCtrl').value;
        this.store.dispatch(new AddTopic({ title: topic, pilot: 'SRO', votes: [] }));
    }

    removeTopic(topic: Topic) {
        this.store.dispatch(new RemoveTopic(topic));
    }

}
