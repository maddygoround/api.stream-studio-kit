/**
 * Create and manage a project with a {@link ScenelessProject.Commands simple and opinionated interface}.
 *
 * A ScenelessProject is designed to fulfill all of the requirements of
 * a standard web-based broadcaster. It provides simple
 * management of WebRTC {@link Participant Participants},
 * custom layouts, backgrounds, and overlay content.
 *
 * Internally, any {@link Project} that meets a certain set of preconditions is
 * eligible to act as a ScenelessProject. The simplest way to ensure a project
 * can leverage these commands is by creating one with {@link create ScenelessProject.create()}.
 *
 * ```typescript
 * // Create a project for the user with default settings
 * const project = await ScenelessProject.create({
 *   backgroundImage: 'https://studio.golightstream.com/images/polygons.jpg',
 *   layout: 'Grid',
 * })
 *
 * // Pass the project in to receive a list of commands unique to a ScenelessProject
 * const projectCommands = ScenelessProject.commands(project)
 *
 * // Use the commands to update the project's contents (what participants/overlays will appear in the output stream)
 * projectCommands.addParticipant(participantId)
 * ```
 *
 * ----
 * _Note: When using a project interface such as this, avoid using
 * any {@link Command Commands} that operate on elements inside the project. This
 * includes any command which operates on a node (e.g. {@link Command.updateNode} or {@link Command.reorderNodes})._
 *
 * _This is an alternative to {@link Command.createProject}._
 *
 * @module ScenelessProject
 */
import * as Layout from '../compositor/html/html-layouts';
import { CoreContext } from '../core/context';
import { SDK, Compositor } from '../core/namespaces';
import { Disposable } from '../core/types';
import LayoutName = Layout.LayoutName;
export type { LayoutName };
export declare type ParticipantProps = {
    volume: number;
    isMuted: boolean;
    isHidden: boolean;
};
export declare type HTMLVideoElementAttributes = {
    loop?: boolean;
    autoplay?: boolean;
    muted?: boolean;
};
export declare type ParticipantType = 'camera' | 'screen';
interface PlaybackOptions {
    playsinline?: boolean;
    disablepictureinpicture?: boolean;
    muted?: boolean;
    loop?: boolean;
    autoplay?: boolean;
}
interface ScenelessProject extends SDK.Project {
}
/**
 * These commands assist with management of WebRTC {@link Participant Participants},
 * custom layouts, backgrounds, and overlay content.
 *
 * Only a valid {@link ScenelessProject} can leverage these commands.
 */
export interface Commands {
    /**
     * Get the node that holds the stream's background
     * @private
     */
    getBackground(): Compositor.SceneNode;
    /**
     * Get the node that holds the stream's content
     * @private
     */
    getContent(): Compositor.SceneNode;
    /**
     * Get the node that holds the stream's foreground (overlays)
     * @private
     */
    getForeground(): Compositor.SceneNode;
    /**
     * Get the active layout
     * @private
     */
    getLayout(): string;
    /**
     * Get all participants in the project
     * @private
     */
    getParticipants(room: SDK.Room): Compositor.SceneNode[];
    /**
     * Set the active layout and associated layoutProps
     */
    setLayout(layout: LayoutName, layoutProps: LayoutProps): void;
    /**
     * Get the active background image
     */
    getBackgroundVideo(): string;
    /**
     * Get the active background image
     */
    getBackgroundImage(): string;
    /**
     * Set the active background image
     */
    setBackgroundImage(src: string): void;
    /**
     * Set the active background image
     */
    setBackgroundVideo(src: string, attributes?: HTMLVideoElementAttributes): void;
    /**
     * Get the active foreground overlay
     */
    getImageOverlay(): string | string[];
    /**
     * Get the active foreground overlay
     */
    getVideoOverlay(): string | string[];
    /**
     * Set the active foreground overlay
     */
    addImageOverlay(overlayId: string, src: string): Promise<void>;
    /**
     * set image overlay on foreground layer
     */
    addVideoOverlay(overlayId: string, src: string, playbackOptions?: PlaybackOptions): Promise<void>;
    /**
     * remove image overlay from foreground layer
     */
    removeVideoOverlay(overlayId: string): Promise<void>;
    /**
     * remove image overlay from foreground layer
     */
    removeImageOverlay(overlayId: string): Promise<void>;
    /**
     * play video overlay on foreground
     */
    playOverlay(src: string): void;
    /** Set one participant to "showcase". This participant will expand to fill
     * the space of the stream without affecting the underlying layout.
     */
    setShowcase(participantId: string, 
    /** @default `'camera'` */
    type?: ParticipantType): ReturnType<typeof CoreContext.Command.updateNode>;
    /**
     * @hook
     * Receive information about the showcased participant.
     * As with other hooks, the callback will be invoked when its value changes.
     */
    useShowcase(cb: (state: {
        participantId: string;
        type: ParticipantType;
    }) => void): Disposable;
    /**
     * Add a participant to the stream canvas.
     * Available participants can be gleaned from the WebRTC {@link Room} using
     * {@link Room.useParticipants}.
     *
     * A participant will remain on stream even if there is no active feed, until
     * it is removed using {@link removeParticipant removeParticipant()} or {@link pruneParticipants pruneParticipants()}.
     */
    addParticipant(participantId: string, props: Partial<ParticipantProps>, 
    /**
     * The type of participant feed to add.
     * @default `'camera'`
     */
    type?: ParticipantType): Promise<void>;
    /**
     * @private
     * @deprecated Use addParticipant() with parameter `type`
     */
    addParticipantScreenshare(participantId: string, props: Partial<ParticipantProps>): Promise<void>;
    /**
     * Remove a stream participant from the stream canvas.
     */
    removeParticipant(participantId: string, type: ParticipantType): void;
    /**
     * @private
     * @deprecated Use removeParticipant() with parameter `type`
     */
    removeParticipantScreenshare(participantId: string): void;
    /**
     * @private
     * Get the node associated with a room participant
     * */
    getParticipantNode(id: string, 
    /** @default `'camera'` */
    type?: ParticipantType): Compositor.SceneNode;
    /**
     * Get {@link ParticipantProps} associated with a participant/type.
     */
    getParticipantState(participantId: string, 
    /** @default `'camera'` */
    type?: ParticipantType): ParticipantProps;
    /**
     * @hook
     * Receive {@link ParticipantProps} associated with a participant/type
     * via invoked callback anytime one of the property values changes.
     */
    useParticipantState(participantId: string, cb: (state: ParticipantProps) => void, 
    /** @default `'camera'` */
    type?: ParticipantType): Disposable;
    /**
     * Change a participant's volume.
     * This does not affect the underlying MediaStreamTrack.
     */
    setParticipantVolume(participantId: string, 
    /**
     * Accepted values from [0 - 1]
     */
    volume: number): void;
    /**
     * Mute a participant without changing their volume.
     *  This does not affect the underlying MediaStreamTrack.
     *
     * Participants muted in this way will not stop sending
     *  audio data, but it will not play on the receiving end.
     *
     * A host may use this to override a guest's settings
     *  for the stream output.
     */
    setParticipantMuted(participantId: string, isMuted: boolean): void;
    /**
     * Hide a participant video feed from the stream.
     *  This does not affect the underlying MediaStreamTrack.
     *
     * Participants hidden in this way will not stop sending
     *  video data, but it will not play on the receiving end.
     *
     * A host may use this to override a guest's settings
     *  for the stream output.
     */
    setParticipantHidden(participantId: string, isHidden: boolean): void;
    /**
     * Remove all participants from the stream canvas who are not actively
     * sending a MediaStreamTrack for display.
     */
    pruneParticipants(): void;
}
/**
 * Accepts a Project that was created using {@link ScenelessProject.create ScenelessProject.create()}
 * and returns several commands specialized for a Sceneless broadcasting experience.
 *
 * These commands assist with management of WebRTC {@link Participant Participants},
 * custom layouts, backgrounds, and overlay content.
 */
export declare const commands: (project: ScenelessProject) => Commands;
export declare type LayoutProps = {
    cover?: boolean;
    /** Valid CSS for justify-content */
    justifyViewers?: 'flex-end' | 'center' | 'flex-start';
    /** Percentage */
    barWidth?: number;
    barPosition?: 'bottom' | 'side';
    useGrid?: boolean;
};
declare type ScenelessSettings = {
    backgroundImage?: string;
    backgroundVideo?: string;
    layout?: string;
    layoutProps?: LayoutProps;
};
/**
 * **An abstraction over {@link Command.createProject Command.createProject()}.**
 *
 * A Project created using this function will be compatible with {@link ScenelessProject.commands ScenelessProject.commands()}
 *
 * **Emits: ProjectAdded**
 */
export declare const create: (settings?: ScenelessSettings, props?: SDK.Props) => Promise<ScenelessProject>;
/** @private */
export declare const createCompositor: (layoutId: string, size: {
    x: number;
    y: number;
}, settings: ScenelessSettings) => Promise<Compositor.Project>;
