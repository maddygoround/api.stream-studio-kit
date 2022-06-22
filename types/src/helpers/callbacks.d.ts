/**
 * Utility functions for observing state over time.
 *
 * These functions accept a callback which will be invoked with
 * the latest value any time it detects a change.
 *
 * @module Callbacks
 */
import { SDK } from '../core/namespaces';
/**
 * Calls back with the active project's room.
 */
export declare const useActiveProjectRoom: (cb: (room: SDK.Room) => void) => SDK.Disposable;
