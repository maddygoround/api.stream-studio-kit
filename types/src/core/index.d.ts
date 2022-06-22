import './internal-events';
export * from './namespaces';
import { Compositor, SDK } from './namespaces';
import { LogLevel } from './types';
/**
 * Basic application settings.
 */
export declare type Settings = {
    env?: 'dev' | 'stage' | 'prod';
    logLevel?: LogLevel;
    guestToken?: string;
};
/**
 * @experimental Experimental settings that should be used with caution.
 *
 * ----
 * _Note: Custom layouts and transforms should not be registered
 *  unless the same layouts and transforms are accessible by the
 *  server rendering the output stream._
 */
export declare type AdvancedSettings = {
    sources?: Compositor.Source.SourceDeclaration[];
    layouts?: Compositor.Layout.LayoutDeclaration[];
    transforms?: Compositor.Transform.TransformDeclaration[];
    defaultTransforms?: Compositor.Transform.DefaultTransformMap;
};
/**
 * Create a singleton {@link Studio} instance to serve as the root for
 * all SDK functionality.
 */
export declare const init: (settings?: Settings & AdvancedSettings) => Promise<SDK.Studio>;
