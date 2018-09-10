import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from '../../models/topic';

@Component({
    selector: 'th-topic-card',
    templateUrl: './topic-card.component.html',
    styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent {

    @Input()
    topic: Topic;

    @Output()
    delete = new EventEmitter<Topic>();

    constructor() {
    }

    remove() {
        this.delete.emit(this.topic);
    }
}
