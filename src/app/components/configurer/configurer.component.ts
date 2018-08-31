import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Message, StompSubscription } from '@stomp/stompjs';
import { Moment, utc } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { Barcamp } from '../../models/barcamp';
import { SlotType } from '../../models/slot-type';
import { Time } from '../../models/time';
import { WebsocketService } from '../../services/websocket.service';
import { AddDay } from '../../state/planning.actions';
import { PlanningState } from '../../state/planning.state';

@Component({
    selector: 'th-configurer',
    templateUrl: './configurer.component.html',
    styleUrls: ['./configurer.component.scss']
})
export class ConfigurerComponent implements OnInit, OnDestroy {

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

    topicForm: FormGroup;

    topicSubscription: StompSubscription;

    topics: string[] = ['test'];

    constructor(private fb: FormBuilder,
                private websocketService: WebsocketService,
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
        console.log('test', topic);
        this.websocketService.sendTopic(topic);
    }

    ngOnInit(): void {
        this.websocketService.subscribeToTopics((message: Message) => {
            console.log('received message', message);
            this.topics.push(message.body);
        })
    }

    ngOnDestroy(): void {
        this.topicSubscription.unsubscribe();
    }

}
