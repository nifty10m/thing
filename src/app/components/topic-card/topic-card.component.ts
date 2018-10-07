import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Topic } from '../../models/topic';

@Component({
    selector: 'th-topic-card',
    templateUrl: './topic-card.component.html',
    styleUrls: ['./topic-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
