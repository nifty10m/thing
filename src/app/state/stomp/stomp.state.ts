import { Action, State, StateContext } from '@ngxs/store';
import { StompConfig, StompRService, StompState as StompStatus } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import {
    StompConnect,
    StompDisconnect,
    StompMessage,
    StompSend,
    StompStatusChange,
    StompSubscribe,
    StompUnsubscribe
} from './stomp.actions';

export interface StompStateModel {
    status: string;
    subscriptions: string[];
}

@State<StompStateModel>({
    name: 'stomp'
})
export class StompState {

    private readonly defaultConfig: StompConfig = {
        url: '',
        headers: {},
        heartbeat_in: 0,
        heartbeat_out: 20000,
        reconnect_delay: 5000,
        debug: false,
    };

    private _statusSubscription: Subscription;

    private _subscriptions: { [dest: string]: Subscription } = {};

    constructor(private stompService: StompRService) {
    }

    @Action(StompConnect)
    connect({ dispatch }: StateContext<StompStateModel>, action: StompConnect) {
        if (!action.payload.url) {
            throw new Error('StompConnect requires a url to connect to');
        }
        this.stompService.config = Object.assign({}, this.defaultConfig, action.payload);
        this.stompService.initAndConnect();
        this._statusSubscription = this.stompService.state
            .pipe(
                map((connectionState: number) => StompStatus[connectionState])
            )
            .subscribe((connectionState: string) => dispatch(new StompStatusChange(connectionState)));
    }

    @Action(StompDisconnect)
    disconnect({ patchState }: StateContext<StompStateModel>, action: StompDisconnect) {
        this.stompService.disconnect();
        if (!this._statusSubscription) {
            console.warn('StompDisconnect called without an active subscription to the connection state');
            return;
        }
        this._statusSubscription.unsubscribe();
        patchState({ subscriptions: [] });
    }

    @Action(StompStatusChange)
    statusChange({ patchState }: StateContext<StompStateModel>, action: StompStatusChange) {
        // TODO: do we need to subscribe again if disconnected?
        patchState({ status: action.payload });
    }

    @Action(StompSubscribe)
    subscribe({ dispatch, patchState }: StateContext<StompStateModel>, { payload: { queueName, headers } }: StompSubscribe) {
        this._subscriptions[queueName] = this.stompService.subscribe(queueName, headers)
            .subscribe((msg: Message) => {
                dispatch(new StompMessage(JSON.parse(msg.body)));
                console.log(msg.headers);
            });
    }

    @Action(StompUnsubscribe)
    unsubscribe({ getState, patchState }: StateContext<StompStateModel>, { payload: { queueName } }: StompUnsubscribe) {
        const subscription = this._subscriptions[queueName];
        if (!subscription) {
            console.warn('No active subscription found for queue', queueName);
            return;
        }
        subscription.unsubscribe();
        const subscriptions = getState().subscriptions.filter((sub: string) => sub !== queueName);
        patchState({ subscriptions });
    }

    @Action(StompSend)
    send(ctx: StateContext<StompStateModel>, { payload: { queueName, action, headers } }: StompSend) {
        const body = { type: action.constructor.type, ...action };
        console.log('sending', body);
        this.stompService.publish(queueName, JSON.stringify(body), headers);
    }

    @Action(StompMessage)
    messageReceived({ dispatch }: StateContext<StompStateModel>, { payload }: StompMessage) {
        console.log('received', payload);
        payload.remote = true;
        dispatch(payload);
    }
}
