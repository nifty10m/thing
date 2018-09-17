import { StompConfig } from '@stomp/ng2-stompjs';

export class StompConnect {
    static readonly type = '[STOMP] Connect';

    constructor(public payload: Partial<StompConfig>) {
    }
}

export class StompDisconnect {
    static readonly type = '[STOMP] Disconnect';
}

export class StompSubscribe {
    static readonly type = '[STOMP] Subscribe';

    constructor(public payload: { queueName: string, headers?: object }) {
    }
}

export class StompUnsubscribe {
    static readonly type = '[STOMP] Unsubscribe';

    constructor(public payload: { queueName: string }) {
    }
}

export class StompStatusChange {
    static readonly type = '[STOMP] Status change';

    constructor(public payload: string) {
    }
}

export class StompMessage {
    static readonly type = '[STOMP] Message received';

    constructor(public payload: any) {
    }
}

export class StompSend {
    static readonly type = '[STOMP] Send message';

    constructor(public payload: { queueName: string, action: any, headers?: object }) {
    }
}
