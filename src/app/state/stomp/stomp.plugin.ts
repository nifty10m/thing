import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGXS_PLUGINS, NgxsPlugin } from '@ngxs/store';
import { NgxsNextPluginFn } from '@ngxs/store/src/symbols';
import 'reflect-metadata';
import { StompSend } from './stomp.actions';

const broadcastMetadataKey = Symbol('queueName');

export function Broadcast(queueName: string) {
    if (!queueName) {
        throw new Error('Broadcast expects a queue to send to');
    }
    return function(target) {
        Reflect.defineMetadata(broadcastMetadataKey, queueName, target);
    };
}

@NgModule()
export class NgxsStompPluginModule {
    static forRoot = (): ModuleWithProviders => {
        return {
            ngModule: NgxsStompPluginModule,
            providers: [
                {
                    provide: NGXS_PLUGINS,
                    useClass: StompPlugin,
                    multi: true,
                },
            ]
        };
    };
}

export class StompPlugin implements NgxsPlugin {

    handle(state: any, action: any, next: NgxsNextPluginFn): any {
        const queueName = Reflect.getMetadata(broadcastMetadataKey, action.constructor);

        if (queueName) {
            return next(state, new StompSend({ queueName, action }));
        }
        return next(state, action);
    }

}
