/**
 * Utilities to assist in implementation to a React-based project
 * implementing a {@link ScenelessProject} workflow.
 *
 * These functions are intended to be helpful and are not necessary to use.
 *
 * @module React
 */
import React from 'react';
import { SDK } from '../core/namespaces';
import { ScenelessProject } from './index';
export declare const useActiveProjectRoom: () => SDK.Room;
/**
 * React hook which implements {@link Room.watchDevices} and returns
 * the result as a value.
 */
export declare const useDevices: () => SDK.Devices;
export declare type StudioContext = {
    studio: SDK.Studio;
    /**
     * _(For convenience)_ Store the contextual SDK {@link Studio}.
     */
    setStudio: (studio: SDK.Studio) => void;
    project: SDK.Project;
    /**
     * _(For convenience)_ Store the contextual active {@link Project}.
     */
    setProject: (project: SDK.Project) => void;
    room: SDK.Room;
    /**
     * _(For convenience)_ Store the contextual {@link Room}, once it has been joined.
     */
    setRoom: (room: SDK.Room) => void;
    webcamId: string;
    /**
     * Set the user's active webcam, which will be sent to other
     * guests and eligible to display on the stream canvas.
     *
     * Delegates to {@link Room.setCamera Room.setCamera()}
     */
    setWebcamId: (deviceId: string) => void;
    microphoneId: string;
    /**
     * Set the user's active webcam, which will be sent to other
     * guests and eligible to display on the stream canvas.
     *
     * Delegates to {@link Room.setMicrophone Room.setMicrophone()}
     */
    setMicrophoneId: (deviceId: string) => void;
    /**
     * An interface of functions important to a project
     * under the {@link ScenelessProject} workflow.
     *
     * Equivalent to
     * ```typescript
     * ScenelessProject.commands(project)
     * ```
     */
    projectCommands: ScenelessProject.Commands;
};
export declare const StudioContext: React.Context<StudioContext>;
/**
 * React hook which returns the latest {@link StudioContext}.
 *
 * ```typescript
 * const App = () => {
 *   const { studio, project, room } = useStudio()
 *
 *   // Return some React that depends on studio state
 *   return <></>
 * }
 * ```
 */
export declare const useStudio: () => StudioContext;
/**
 * StudioContext provider
 *
 * ```typescript
 * <StudioProvider>
 *   <App />
 * </StudioProvider>
 * ```
 */
export declare const StudioProvider: ({ children, }: {
    children: React.ReactChild;
}) => JSX.Element;
