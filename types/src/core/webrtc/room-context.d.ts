import { Room, RoomEvent, Participant, ConnectOptions, AudioTrack } from 'livekit-client';
import { ApiStream } from '@api.stream/sdk';
export * as Livekit from 'livekit-client';
/**
 * Types of data messages that are sent/received via websocket
 */
declare enum DataType {
    ChatMessage = "ChatMessage"
}
/**
 * Special events that are implemented/triggered manually
 */
export declare enum SpecialEvent {
    /** Chat event listener is of type (x: ChatObject) => void */
    Chat = "Chat"
}
/**
 * Data object received as websocket message
 */
interface DataObject {
    type: DataType;
}
/**
 * Chat message sent/received via websocket.
 * This is the structure of the message as it is transferred via websocket.
 */
interface ChatDataObject extends DataObject {
    /**
     * Always `'ChatMessage'`
     */
    type: DataType.ChatMessage;
    /**
     * content of chat message
     */
    content: string;
    timestamp: number;
    /**
     * Identities of the recipient {@link Participant Participants}. Only specified if it is a private message. Otherwise, it is undefined.
     */
    recipients?: string[];
    /**
     * Field for miscellaneous data
     */
    metadata?: object | string;
}
/**
 * We have included in the {@link Room} model methods for implementing a chat interface between the {@link Participant Participants} of a WebRTC Room.
 * Chat messages are stored as instances of this ChatObject model.
 *
 * *(See: {@link Room.sendChatMessage sendChatMessage}, {@link Room.useChatHistory useChatHistory})*
 * @category WebRTC
 */
export interface ChatObject extends ChatDataObject {
    /**
     * identity of sender
     */
    sender: string;
    /**
     * Display name of message sender.
     * This is included in addition to the sender's id so that messages can be displayed properly even after the sender has left the {@link Room}.
     */
    displayName: string;
}
/**
 * RoomsManager is essentially a singleton for accessing all livekit rooms
 */
interface IRoomsManager {
    /**
     * Map to different room contexts. keys are the room names.
     */
    rooms: Map<string, LSRoomContext>;
    addRoom(baseUrl: string, roomName: string, token: string): LSRoomContext;
    /**
     * Returns a matching RoomContext if it already exists. Creates and then returns a matching RoomContext otherwise
     */
    ensureRoom(baseUrl: string, roomName: string, token: string): LSRoomContext;
    removeRoom(roomName: string): void;
}
/**
 * Wraps livekit Room interface and allows us to access it, act on it, regardless of connection state
 */
export interface LSRoomContext {
    audioTracks: AudioTrack[];
    /**
     * Bind ApiStream Client to the room context.
     * Must be done before connecting in order to do admin actions.
     */
    bindApiClient: (client: ApiStream) => void;
    connect: (options?: ConnectOptions) => Promise<Room>;
    /**
     * Array of chat messages in ascending chronological order
     */
    chatHistory: ChatObject[];
    /**
     * Sends chat message to entire livekit room, or a private message (if specified) from local participant
     * @param {string[]} [data.recipients] The identities of the recipient participants. If undefined, will send message to all participants in the chat.
     * Only specify for private messages.
     * Do not include the local participant's identity in this.
     */
    sendChatMessage(data: {
        message: string;
        recipients?: string[];
        metadata?: object | string;
    }): void;
    /**
     * Is the localParticipant a room admin?
     */
    isAdmin?: boolean;
    isConnecting: boolean;
    livekitRoom?: Room;
    participants: Participant[];
    /** name of room */
    roomName: string;
    /**
     * kick a remote participant from your livekit room. Can only be used by admins.
     * @param identity Identity of the user that you wish to kick
     */
    kickParticipant(identity: string): void;
    /**
     * mute a track as room admin
     */
    muteTrackAsAdmin(trackSid: string): void;
    /**
     * Special method for subscribing to livekit room connect events.
     */
    subscribeToConnect(listener: (room: Room) => void): () => void;
    /**
     * Subscribe to a room event. Returns a function that will unsubscribe from the event when invoked.
     * Use this method because it is safe to use even if room does not exist yet, which will avoid a ton of null checks.
     * If room does not exist yet, it will subscribe to the room event once the room is created.
     * @param {RoomEvent} evt the room event
     * @param listener event listener to be called
     */
    subscribeToRoomEvent(evt: RoomEvent, listener: (...args: any[]) => void): () => void;
    /**
     * Subscribe to a local participant event event. Returns a function that will unsubscribe from the event when invoked.
     * Use this method because it is safe to use even if room does not exist yet.
     * @param {ParticipantEvent} evt the local participant event
     * @param listener event listener to be called
     */
    subscribeToLocalParticipantEvent(evt: string, listener: (...args: any[]) => void): () => void;
    /**
     * Subscribe to a special event event such as a chat event. Returns a function that will unsubscribe from the event when invoked.
     * Use this method because it is safe to use even if room does not exist yet.
     * @param {string} evt the local participant event
     * @param listener event listener to be called
     */
    subscribeToSpecialEvent(evt: SpecialEvent, listener: (...args: any[]) => void): () => void;
    /**
     * should be the same as the sfu token
     */
    token: string;
    readonly url: string;
    /**
     * special method for unsubscribing from livekit room connect events
     */
    unsubscribeFromConnect(listener: (room: Room) => void): void;
    /**
     * Unsubscribe from a room event
     * Use this method because it is safe to use even if room does not exist yet.
     * @param {RoomEvent} evt the room event
     * @param listener event listener to be removed
     */
    unsubscribeFromRoomEvent(evt: RoomEvent, listener: (...args: any[]) => void): void;
    /**
     * Unsubscribe from a local participant event
     * Use this method because it is safe to use even if room does not exist yet.
     * @param {ParticipantEvent} evt the room event right now there is only 'Chat'
     * @param listener event listener to be removed
     */
    unsubscribeFromLocalParticipantEvent(evt: string, listener: (...args: any[]) => void): void;
    /**
     * Unsubscribe from a speceal event
     * Use this method because it is safe to use even if room does not exist yet.
     * @param {SpecialEvent} evt the room event right now there is only 'Chat'
     * @param listener event listener to be removed
     */
    unsubscribeFromSpecialEvent(evt: SpecialEvent, listener: (...args: any[]) => void): void;
}
/**
 * Basically, a singleton for managing and accessing all livekit rooms.
 * Contains a 'rooms' property, which is of type Map<roomName, RoomContext>
 */
export declare class RoomsManager implements IRoomsManager {
    rooms: Map<string, LSRoomContext>;
    constructor();
    addRoom(baseUrl: string, roomName: string, token: string): LSRoomContext;
    ensureRoom(baseUrl: string, roomName: string, token: string): LSRoomContext;
    removeRoom(roomName: string): Promise<void>;
}
export declare class RoomContext implements LSRoomContext {
    /**
     * base URL for the webrtc server
     */
    private _baseUrl;
    private _chatHistory;
    /**
     * event listeners just for livekit room connect
     */
    private _connectListeners;
    /**
     * Event listeners that are registered OR to be registered upon connection
     * Keys are of type RoomEvent
     */
    private _roomEventListenerRegistry;
    /**
     * Event listeners that are registered OR to be registered on the localParticipant upon connection
     * Keys are of type ParticipantEvent
     */
    private _localParticipantEventListenerRegistry;
    /**
     * Registry for special/custom events such as chat events
     */
    private _specialEventListenerRegistry;
    /**
     * access token for our connection
     * Should be acquired from vapi
     */
    private _jwt;
    /**
     * reference to the rooms manager that contains it
     */
    private _manager;
    private _apiClient;
    audioTracks: AudioTrack[];
    isConnecting: boolean;
    livekitRoom: Room;
    participants: Participant[];
    roomName: string;
    /**
     * Livekit Room Service client, for performing admin functions
     * Should only be defined if user is room admin
     */
    private _admin;
    /**
     * @param baseUrl base url for the webrtc server
     * @param token get
     */
    constructor(baseUrl: string, roomName: string, token: string, manager: IRoomsManager);
    bindApiClient(client: ApiStream): void;
    get isAdmin(): boolean;
    set isAdmin(value: boolean);
    get token(): string;
    set token(value: string);
    get url(): string;
    set url(value: string);
    get chatHistory(): ChatObject[];
    set chatHistory(value: ChatObject[]);
    private _updateParticipants;
    /**
     * @param identity Identity of the user that you wish to kick
     */
    kickParticipant(identity: string): Promise<void>;
    muteTrackAsAdmin(trackSid: string, mute?: boolean): void;
    private _appendChat;
    subscribeToConnect(listener: (room: Room) => void): () => void;
    unsubscribeFromConnect(listener: (room: Room) => void): void;
    subscribeToSpecialEvent(evt: SpecialEvent, listener: (...args: any[]) => void): () => void;
    unsubscribeFromSpecialEvent(evt: SpecialEvent, listener: (...args: any[]) => void): void;
    private _triggerSpecialEvents;
    /**
     * connect to livekit webrtc room
     * @param {string} identity unique user name to be displayed to other users
     */
    connect(options?: ConnectOptions): Promise<Room>;
    subscribeToLocalParticipantEvent(evt: string, listener: (...args: any[]) => void): () => void;
    unsubscribeFromLocalParticipantEvent(evt: string, listener: (...args: any[]) => void): void;
    subscribeToRoomEvent(evt: RoomEvent, listener: (...args: any[]) => void): () => void;
    unsubscribeFromRoomEvent(evt: RoomEvent, listener: (...args: any[]) => void): void;
    /**
     * Sends chat message to entire livekit room, or a private message (if specified) from local participant
     * @param {string[]} [recipients] The identities of the recipient participants. If undefined, will send message to all participants in the chat.
     * Only specify for private messages.
     * Do not include the local participant's identity in this.
     */
    sendChatMessage(data: {
        message: string;
        recipients?: string[];
        metadata?: object | string;
    }): void;
}
