/**
 * Events are emitted as a result of {@link Commands} or other
 * external forces, indicating that state should change.
 *
 * **{@link ExternalEventMap}** for a full list of events.
 *
 * Subscribe to events using {@link Studio.subscribe subscribe()} or {@link Studio.on on()}.
 *
 * @module Events
 */
import { SDK } from './namespaces';
import { LiveApiModel } from '@api.stream/sdk';
import { Disposable, ProjectBroadcastPhase } from './types';
/** @private */
export declare type ActionMap<M extends {
    [index: string]: any;
}> = {
    [Key in keyof M]: {
        type: Key;
        payload: M[Key];
    };
};
/**
 *  @private A union of all available events structured as `{ type, payload }`
 */
export declare type Events = ActionMap<ExternalEventMap>[keyof ActionMap<ExternalEventMap>];
/** @private Global event bus */
export declare const trigger: <Key extends keyof ExternalEventMap>(name: Key, ...args: ExternalEventMap[Key] extends undefined ? [] : [ExternalEventMap[Key]]) => Promise<void>;
/** @private */
export declare const subscribe: (cb: <Key extends keyof ExternalEventMap>(name: Key, payload: any) => void) => Disposable;
/** @private */
export declare const on: <Key extends keyof ExternalEventMap>(name: Key, cb: (...args: ExternalEventMap[Key] extends undefined ? [] : [ExternalEventMap[Key]]) => void) => SDK.Disposable;
/** @private Global event bus */
export declare const triggerInternal: <Key extends keyof InternalEventMap>(name: Key, ...args: InternalEventMap[Key] extends undefined ? [] : [InternalEventMap[Key]]) => Promise<void>;
/** @private */
export declare const subscribeInternal: (cb: <Key extends keyof InternalEventMap>(name: Key, payload: any) => void) => Disposable;
/** @private */
export declare const onInternal: <Key extends keyof InternalEventMap>(name: Key, cb: (...args: InternalEventMap[Key] extends undefined ? [] : [InternalEventMap[Key]]) => void) => SDK.Disposable;
/** @private */
export declare type On = typeof on;
/** @private */
export declare type Subscribe = typeof subscribe;
/** @private */
export declare type Trigger = typeof trigger;
/**
 * A list of all external events available for subscription.
 *
 * Subscribe to events using {@link Studio.subscribe subscribe()} or {@link Studio.on on()}.
 */
export interface ExternalEventMap {
    /**
     * @category User
     * @local
     */
    UserLoaded: SDK.User;
    /**
     * @category User
     */
    UserChanged: {
        user: SDK.User;
    };
    /**
     * @category Project
     */
    ProjectAdded: {
        project: SDK.Project;
    };
    /**
     * @category Project
     * @private
     * @deprecated Use ProjectChanged
     */
    ProjectMetaUpdated: {
        projectId: SDK.Project['id'];
        meta: SDK.Props;
    };
    /**
     * @category Project
     */
    ProjectChanged: {
        project: SDK.Project;
    };
    /**
     * @category Project
     */
    ProjectRemoved: {
        projectId: SDK.Project['id'];
    };
    /**
     * @category Project
     * @local
     */
    RoomJoined: {
        projectId: SDK.Project['id'];
        room: SDK.Room;
    };
    /**
     * @category Project
     * @local
     */
    ActiveProjectChanged: {
        projectId: SDK.Project['id'];
    };
    /**
     * @category Broadcast
     */
    BroadcastStarted: {
        projectId: SDK.Project['id'];
    };
    /**
     * @category Broadcast
     */
    BroadcastStopped: {
        projectId: SDK.Project['id'];
    };
    /**
     * @category Broadcast
     */
    BroadcastError: {
        projectId: SDK.Project['id'];
        error: LiveApiModel.ProjectBroadcastError;
    };
    /**
     * @category Destination
     */
    DestinationAdded: {
        projectId: SDK.Project['id'];
        destination: SDK.Destination;
    };
    /**
     * @category Destination
     */
    DestinationChanged: {
        projectId: SDK.Project['id'];
        destination: SDK.Destination;
    };
    /**
     * @category Destination
     */
    DestinationRemoved: {
        projectId: SDK.Project['id'];
        destinationId: SDK.Destination['id'];
    };
    /**
     * @category Destination
     * @private
     * @deprecated Use DestinationChanged
     */
    DestinationEnabled: {
        projectId: SDK.Project['id'];
        destinationId: SDK.Destination['id'];
    };
    /**
     * @category Destination
     * @private
     * @deprecated Use DestinationChanged
     */
    DestinationDisabled: {
        projectId: SDK.Project['id'];
        destinationId: SDK.Destination['id'];
    };
    /**
     * @category Destination
     * @private
     * @deprecated Use ProjectChanged
     */
    DestinationSet: {
        projectId: SDK.Project['id'];
        rtmpUrl: string;
        rtmpKey: string;
    };
    /**
     * @category Source
     */
    SourceAdded: {
        source: SDK.Source;
    };
    /**
     * @category Source
     */
    SourceChanged: {
        source: SDK.Source;
    };
    /**
     * @category Source
     */
    SourceRemoved: {
        source: SDK.Source['id'];
    };
}
/**
 * @private
 * @internal
 */
export interface InternalEventMap {
    UserChanged: LiveApiModel.Collection;
    ProjectAdded: LiveApiModel.Project;
    ProjectChanged: {
        project: LiveApiModel.Project;
        phase?: ProjectBroadcastPhase;
    };
    ProjectRemoved: {
        projectId: LiveApiModel.Project['projectId'];
    };
    ProjectSourceAdded: {
        projectId: LiveApiModel.Project['projectId'];
        source: LiveApiModel.Source;
    };
    ProjectSourceRemoved: {
        projectId: LiveApiModel.Project['projectId'];
        sourceId: LiveApiModel.Source['sourceId'];
    };
    ActiveProjectChanged: {
        projectId: LiveApiModel.Project['projectId'];
    };
    DestinationAdded: LiveApiModel.Destination;
    DestinationChanged: LiveApiModel.Destination;
    DestinationRemoved: {
        projectId: LiveApiModel.Project['projectId'];
        destinationId: LiveApiModel.Destination['destinationId'];
    };
    SourceAdded: LiveApiModel.Source;
    SourceChanged: LiveApiModel.Source;
    SourceRemoved: LiveApiModel.Source['sourceId'];
    NodeAdded: {
        projectId: LiveApiModel.Project['projectId'];
        nodeId: SDK.SceneNode['id'];
    };
    NodeChanged: {
        projectId: LiveApiModel.Project['projectId'];
        nodeId: SDK.SceneNode['id'];
    };
    NodeRemoved: {
        projectId: LiveApiModel.Project['projectId'];
        nodeId: SDK.SceneNode['id'];
    };
}
