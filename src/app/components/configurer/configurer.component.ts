import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

    topics: string[] = [];

    constructor(private fb: FormBuilder,
                private changeDetector: ChangeDetectorRef,
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
        this.websocketService.getTopics(
            (topics: string[]) => {
                console.log('received initial', topics);
                this.topics = topics;
                this.changeDetector.detectChanges();
            },
            (topic: string) => {
                console.log('received stream', topic);
                this.topics.push(topic);
                this.changeDetector.detectChanges();
            }
        );
    }

    ngOnDestroy(): void {
        this.topicSubscription.unsubscribe();
    }

}
