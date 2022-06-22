/**
 * Commands represent actions that can be taken by a user.
 *
 * Most commands accept a contextual parameter `projectId`.
 * If this parameter is excluded from a function call, the user's
 * active project will be used instead.
 *
 * Upon completion, a command may emit zero or more {@link EventMap Events}. Commands
 * return Promises that will attempt to resolve to the most pertinent value.
 * However, it is good practice to instead rely on events where possible, when
 * updating application state.
 *
 * For example, listening for the event `BroadcastStarted` will indicate
 * the following scenarios:
 *
 *   - The current user has initiated a broadcast
 *   - A collaborator (or host) has initiated a broadcast
 *   - Some external force has initiated a broadcast
 *
 * When depending on the Event rather than the command's return value, we can
 * be sure that our state is updating under all relevant circumstances.
 *
 * ----
 *
 * _Note: Commands marked `internal` are low-level commands that should only be
 * used with caution. Higher-level abstractions should be used to manipulate Nodes
 * (elements on the stream canvas)._
 *
 * @private This module is currently hidden from users of the Studio Kit.
 *  Favor the creation of helpers when supporting developers who require
 *  functionality contained in this module.
 *
 * @module Commands
 */
import { Props } from './types';
import { SDK } from './namespaces';
/**
 * Update the current user's metadata with custom data opaque to the SDK.
 * Existing props are not affected unless explicitly overwritten.
 *
 * @category User
 */
export declare const updateUserProps: (payload: {
    /** Arbitrary metadata to associate with the user */
    props?: Props;
}) => Promise<void>;
/**
 * Create a project with optional metadata.
 *
 * ----
 * _Note: This is a low level function that necessitates careful management
 *  of the nodes within. Consider {@link ScenelessProject.create} instead._
 *
 * @category Project
 */
export declare const createProject: (payload?: {
    /** @private Settings associated with ScenelessProject (or other such wrapper) */
    settings?: {
        [prop: string]: any;
    };
    /** Arbitrary metadata to associate with this project */
    props?: Props;
    /** Pixel dimenions of the canvas (default: `{ x: 1280, y: 720 }`) */
    size?: {
        x: number;
        y: number;
    };
}) => Promise<SDK.Project>;
/**
 * Delete a project.
 *
 * @category Project
 */
export declare const deleteProject: (payload: {
    projectId: SDK.Project['id'];
}) => Promise<void>;
/**
 * Update a project's metadata with custom data opaque to the SDK.
 * Existing props are not affected unless explicitly overwritten.
 *
 * @category Project
 */
export declare const updateProjectProps: (payload: {
    projectId: SDK.Project['id'];
    /** Arbitrary metadata to associate with this project */
    props?: Props;
}) => Promise<void>;
/**
 * @deprecated Use updateProjectProps
 */
export declare const updateProjectMeta: (payload: {
    projectId: SDK.Project['id'];
    /** Arbitrary metadata to associate with this project */
    meta?: Props;
}) => Promise<void>;
/**
 * Set the active project for the user, setting up event handlers and
 *  disposing of event listeners for the previous active project.
 *
 * This project will be used as the default project
 *  for commands that do not specify `payload.projectId`
 *
 * @category Project
 */
export declare const setActiveProject: (payload: {
    projectId: SDK.Project['id'];
}) => Promise<SDK.Project>;
/**
 * Initiate WebRTC connection to the room associated with this project.
 *
 * @category Project
 */
export declare const joinRoom: (payload: {
    projectId: SDK.Project['id'];
    /** A public name for other guests will see associated with your {@link Participant} */
    displayName?: string;
}) => Promise<SDK.Room>;
/**
 * Create a node within the project's scene tree.
 * A node is functionally comparable to a DOM Node - it serves only as a vessel
 * of properties.
 *
 * A node is not inherently useful. It is up to the renderer to interpret the data it holds.
 * If a node is given data the renderer is not aware of, it will accomplish nothing.
 *
 * ----
 * _Note: This is a low level interface. Abstractions like {@link ScenelessProject}
 * prevent the need for node manipulations._
 *
 * @internal _Use with caution_
 * @category Node
 */
export declare const createNode: (payload: {
    projectId?: string;
    props: {
        [prop: string]: any;
    };
    parentId: string;
    index?: number;
}) => Promise<import("../compositor").SceneNode>;
/**
 * Remove a node from the project's scene tree.
 *
 * ----
 * _Note: This is a low level interface. Abstractions like {@link ScenelessProject}
 * prevent the need for node manipulations._
 *
 * @internal _Use with caution_
 * @category Node
 */
export declare const deleteNode: (payload: {
    projectId?: string;
    nodeId: string;
}) => Promise<void>;
/**
 * Update the properties of a node.
 * `payload.props` will be shallowly merged onto its existing `props`.
 *
 * ----
 * _Note: This is a low level interface. Abstractions like {@link ScenelessProject}
 * prevent the need for node manipulations._
 *
 * @internal _Use with caution_
 * @category Node
 */
export declare const updateNode: (payload: {
    projectId?: string;
    nodeId: string;
    props: {
        [prop: string]: any;
    };
}) => Promise<import("../compositor").SceneNode>;
/**
 * Update the layout of a node.
 *
 * ----
 * _Note: This is a low level interface. Abstractions like {@link ScenelessProject}
 * prevent the need for node manipulations._
 *
 * @internal _Use with caution_
 * @category Node
 */
export declare const setNodeLayout: (payload: {
    projectId?: string;
    nodeId: string;
    layout: string;
    layoutProps?: {
        [prop: string]: any;
    };
}) => Promise<void>;
/**
 * Move a node to a different parent node.
 *
 * ----
 * _Note: This is a low level interface. Abstractions like {@link ScenelessProject}
 * prevent the need for node manipulations._
 *
 * @internal _Use with caution_
 * @category Node
 */
export declare const moveNode: (payload: {
    projectId?: string;
    nodeId: string;
    parentId: string;
    index?: number;
}) => Promise<void>;
/**
 * Swap the positions of two nodes, changing parents if necessary.
 *
 * ----
 * _Note: This is a low level interface. Abstractions like {@link ScenelessProject}
 * prevent the need for node manipulations._
 *
 * @internal _Use with caution_
 * @category Node
 */
export declare const swapNodes: (payload: {
    projectId?: string;
    nodeAId: string;
    nodeBId: string;
}) => Promise<void>;
/**
 * Change the order of a node's children.
 *
 * ----
 * _Note: This is a low level interface. Abstractions like {@link ScenelessProject}
 * prevent the need for node manipulations._
 *
 * @internal _Use with caution_
 * @category Node
 */
export declare const reorderNodes: (payload: {
    projectId?: string;
    parentId: string;
    childIds: string[];
}) => Promise<void>;
/**
 * Start broadcasting a project.
 *
 * ----
 * _Note: Destination, encoding, and rendering details will be read from the Project
 * at time of broadcast, so they should be updated ahead of time._
 *
 * @category Broadcast
 */
export declare const startBroadcast: (payload: {
    projectId?: string;
}) => Promise<void>;
/**
 * Stop broadcasting a project.
 *
 * @category Broadcast
 */
export declare const stopBroadcast: (payload: {
    projectId?: string;
}) => Promise<void>;
/**
 * Add a {@link Destination} to a project.
 *
 * @category Destination
 */
export declare const addDestination: (payload: {
    projectId?: string;
    rtmpUrl: string;
    rtmpKey: string;
    enabled: boolean;
    props?: Props;
    /** @deprecated Use `props` */
    metadata?: Props;
}) => Promise<SDK.Destination>;
/**
 * Remove a {@link Destination} from the project.
 *
 * @category Destination
 */
export declare const removeDestination: (payload: {
    projectId?: string;
    destinationId: string;
}) => Promise<void>;
/**
 * Update an existing {@link Destination} on the project.
 *
 * @category Destination
 */
export declare const updateDestination: (payload: {
    projectId?: string;
    destinationId: string;
    rtmpUrl: string;
    rtmpKey: string;
}) => Promise<void>;
/**
 * Update the metadata of an existing {@link Destination} on the project.
 *
 * @category Destination
 */
export declare const updateDestinationProps: (payload: {
    projectId: string;
    destinationId: string;
    props: Props;
}) => Promise<void>;
/**
 * @deprecated Use updateDestinationProps
 */
export declare const updateDestinationMeta: (payload: {
    projectId: string;
    destinationId: string;
    metadata?: Props;
}) => Promise<void>;
/**
 * Enable or disable an existing {@link Destination} on the project.
 *
 * @category Destination
 */
export declare const setDestinationEnabled: (payload: {
    projectId?: string;
    destinationId: string;
    enabled: boolean;
}) => Promise<void>;
/**
 * Overwrite project's first {@link Destination} with new configuration
 *  If no destination exists, one will be created instead.
 *
 * This is a helper to manage a single-destination project. For greater control,
 *  use {@link addDestination}, {@link removeDestination}, or {@link updateDestination}
 *
 * @category Destination
 */
export declare const setDestination: (payload: {
    projectId?: string;
    rtmpUrl: string;
    rtmpKey: string;
}) => Promise<void>;
