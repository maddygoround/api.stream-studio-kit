import { SDK } from '../core/namespaces';
/**
 * Begin device helpers
 */
declare type DeviceCallback = (devices: SDK.Devices) => void;
/** Replace tracks on an existing MediaStream. */
export declare const updateMediaStreamTracks: (srcObject: MediaStream, tracks: {
    audio?: MediaStreamTrack;
    video?: MediaStreamTrack;
}) => void;
/**
 * Determine which permissions a user has already agreed to in their browser.
 */
export declare const getDevicePermissions: () => Promise<{
    /** User has enabled webcam access */
    video: boolean;
    /** User has enabled microphone access */
    audio: boolean;
}>;
/**
 * Request device permissions, or resolve immediately if they are already available.
 */
export declare const ensureDevicePermissions: () => Promise<{
    /** User has enabled webcam access */
    video: boolean;
    /** User has enabled microphone access */
    audio: boolean;
}>;
/**
  Accepts a callback which receives a formatted list of devices anytime
   device availability changes.
 */
export declare const watchDevices: (cb: DeviceCallback) => () => void;
/**
 * Invoke `navigator.mediaDevices.getUserMedia()` with the args provided.
 * Devices are be reported to existing device watchers to ensure equality.
 */
export declare const getUserMedia: MediaDevices['getUserMedia'];
export {};
