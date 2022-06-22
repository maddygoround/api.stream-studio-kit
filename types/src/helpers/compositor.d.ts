import { CompositorSettings } from '../core/types';
/**
 * Render the output compositor displaying the stream canvas, which will be used
 * to display the live feed once a user starts their broadcast. Renders into a
 * supplied HTML element.
 *
 * This compositor may double as an interactive editor with optional settings.
 *
 * _Note: The compositor will automatically render at the largest possible size
 * accomodated by the element that is passed as its container. If the container
 * is smaller than the project resolution (e.g. 720px x 1280px), all of the canvas
 * elements will scale down automatically to fit._
 */
export declare const render: (settings: CompositorSettings) => Promise<void>;
