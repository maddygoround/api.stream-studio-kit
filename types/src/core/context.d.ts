import type { ApiStream, LiveApiModel } from '@api.stream/sdk';
import type { Request, Command, Compositor, SDK } from './namespaces';
import { Props } from './types';
import log from 'loglevel';
/** @private */
export declare const CoreContext: {
    config: {
        defaults: {
            previewTokenDuration: number;
            guestTokenDuration: number;
            transforms: Compositor.Transform.DefaultTransformMap;
        };
    };
    clients: ApiStream;
    Request: typeof Request;
    Command: typeof Command;
    on: <Key extends keyof import("./events").ExternalEventMap>(name: Key, cb: (...args: import("./events").ExternalEventMap[Key] extends undefined ? [] : [import("./events").ExternalEventMap[Key]]) => void) => SDK.Disposable;
    subscribe: (cb: <Key_1 extends keyof import("./events").ExternalEventMap>(name: Key_1, payload: any) => void) => SDK.Disposable;
    /** @private @internal */
    onInternal: <Key_2 extends keyof import("./events").InternalEventMap>(name: Key_2, cb: (...args: import("./events").InternalEventMap[Key_2] extends undefined ? [] : [import("./events").InternalEventMap[Key_2]]) => void) => SDK.Disposable;
    /** @private @internal */
    subscribeInternal: (cb: <Key_3 extends keyof import("./events").InternalEventMap>(name: Key_3, payload: any) => void) => SDK.Disposable;
    /** @private @internal */
    trigger: <Key_4 extends keyof import("./events").ExternalEventMap>(name: Key_4, ...args: import("./events").ExternalEventMap[Key_4] extends undefined ? [] : [import("./events").ExternalEventMap[Key_4]]) => Promise<void>;
    /** @private @internal */
    triggerInternal: <Key_5 extends keyof import("./events").InternalEventMap>(name: Key_5, ...args: import("./events").InternalEventMap[Key_5] extends undefined ? [] : [import("./events").InternalEventMap[Key_5]]) => Promise<void>;
    /** @private @internal */
    state: AppState;
    compositor: Compositor.CompositorInstance;
    connectionId: string;
    version: string;
    log: log.RootLogger;
    logLevel: SDK.LogLevel;
};
export { log };
export declare const setAppState: (state: AppState) => void;
export declare type InternalUser = {
    id: string;
    name: string;
    props: Props;
    metadata: {
        [prop: string]: any;
    };
};
export declare type InternalProject = {
    id: string;
    compositor: Compositor.Project;
    videoApi: {
        project: LiveApiModel.Project;
        phase?: LiveApiModel.ProjectBroadcastPhase;
    };
    layoutApi: {
        layoutId: string;
    };
    sfuToken?: string;
    role?: SDK.Role;
    /**
     * @private The room
     */
    isInitial?: boolean;
    /**
     * @private
     * @deprecated
     */
    roomId?: string;
    props: Props;
};
export declare type InternalSource = LiveApiModel.Source;
export declare type AppState = {
    user: InternalUser;
    projects: InternalProject[];
    sources: any[];
    activeProjectId: string;
    accessToken?: string;
};
export default CoreContext;
