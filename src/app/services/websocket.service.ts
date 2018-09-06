import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private readonly wsUrl = 'ws://localhost:8080/websocket';

    constructor() {
    }

    getTopics(callbackInitial: any, callbackStream: any) {

    }

    sendTopic(topic: string) {

    }
}
