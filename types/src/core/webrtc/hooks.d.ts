import React from 'react';
import { LSRoomContext, ChatObject } from './room-context';
import { Room, Participant, RoomEvent, ConnectionQuality, TrackPublication } from 'livekit-client';
declare type ChatState = ChatObject[];
/**
 * Basically replicates the same functionality as livekit-react's own useRoom hook.
 * Returns { room, participants, connect, isConnecting, chatHistory, sendChatMessage, isAdmin, removeParticipant, muteTrackAsAdmin }
 */
export declare const useLivekitRoom: (roomName: string, token: string) => {
    room: Room;
    participants: Participant[];
    connect: () => Promise<void>;
    chatHistory: ChatState;
    sendChatMessage: (data: {
        message: string;
        recipients?: string[];
        metadata?: string | object;
    }) => void;
    removeParticipant: (identity: string) => void;
    muteTrackAsAdmin: (trackSid: string) => void;
    isConnecting: boolean;
    roomContext: LSRoomContext;
    isAdmin: boolean;
};
declare type LivekitContext = {
    roomName: string;
    url: string;
    token: string;
};
/**
 * subscribes to a livekit RoomEvent for the lifecycle of the component
 */
export declare const useRoomEvent: (evt: RoomEvent, listener: (...args: any[]) => void) => void;
/**
 * Updates publications / subscribed tracks arrays when track is published/subscribed
 * Also returns isSpeaking, and isLocal
 */
export declare const useParticipant: (participant: Participant) => {
    publications: TrackPublication[];
    subscribedTracks: TrackPublication[];
    isLocal: boolean;
    isSpeaking: boolean;
    connectionQuality: ConnectionQuality;
    audioTracks?: Map<string, TrackPublication>;
    videoTracks?: Map<string, TrackPublication>;
    tracks?: Map<string, TrackPublication>;
    audioLevel?: number;
    sid?: string;
    identity?: string;
    name?: string;
    metadata?: string;
    lastSpokeAt?: Date;
    addListener?: (eventName: string | symbol, listener: (...args: any[]) => void) => Participant;
    on?: (eventName: string | symbol, listener: (...args: any[]) => void) => Participant;
    once?: (eventName: string | symbol, listener: (...args: any[]) => void) => Participant;
    removeListener?: (eventName: string | symbol, listener: (...args: any[]) => void) => Participant;
    off?: (eventName: string | symbol, listener: (...args: any[]) => void) => Participant;
    removeAllListeners?: (event?: string | symbol) => Participant;
    setMaxListeners?: (n: number) => Participant;
    getMaxListeners?: () => number;
    listeners?: (eventName: string | symbol) => Function[];
    rawListeners?: (eventName: string | symbol) => Function[];
    emit?: (eventName: string | symbol, ...args: any[]) => boolean;
    listenerCount?: (eventName: string | symbol) => number;
    prependListener?: (eventName: string | symbol, listener: (...args: any[]) => void) => Participant;
    prependOnceListener?: (eventName: string | symbol, listener: (...args: any[]) => void) => Participant;
    eventNames?: () => (string | symbol)[];
};
/**
 * React context containing the url and roomname, which are in turn used to look up the livekit room
 */
export declare const LivekitContext: React.Context<LivekitContext>;
/**
 * Just a shortcut that uses the react context so that you don't have to look it up every time you want to use the room
 */
export declare const useCurrentRoom: () => {
    room: Room;
    participants: Participant[];
    connect: () => Promise<void>;
    chatHistory: ChatState;
    sendChatMessage: (data: {
        message: string;
        recipients?: string[];
        metadata?: string | object;
    }) => void;
    removeParticipant: (identity: string) => void;
    muteTrackAsAdmin: (trackSid: string) => void;
    isConnecting: boolean;
    roomContext: LSRoomContext;
    isAdmin: boolean;
};
export {};
