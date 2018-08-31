import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import { Client, Message } from '@stomp/stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private readonly wsUrl = 'ws://localhost:8080/websocket';

    private client: Client;

    constructor() {
        this.client = Stomp.client(this.wsUrl);
    }

    getTopics(callbackInitial: any, callbackStream: any) {
        this.client.connect({}, () => {
            this.client.subscribe('/topics/initial', (message: Message) => callbackInitial(JSON.parse(message.body)));
            this.client.subscribe('/topics/stream', (message: Message) => callbackStream(message.body));
        });
    }

    sendTopic(topic: string) {
        console.log('called');
        this.client.send('/topics', {}, topic);
    }
}
