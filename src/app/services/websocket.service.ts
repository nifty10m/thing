import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private readonly wsUrl = 'ws://localhost:8080/websocket';

    private client: Client;

    constructor() {
    }

    subscribeToTopics(callback: any) {
        this.client = Stomp.client(this.wsUrl);
        this.client.connect({}, () => this.client.subscribe('/topic/stream', callback));
    }

    sendTopic(topic: string) {
        console.log('called');
        this.client.send('/app/topics', {}, topic);
    }
}
