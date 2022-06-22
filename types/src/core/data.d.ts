import { InternalSource } from './context';
import { Context, SDK, Compositor } from './namespaces';
import { LiveApiModel, LayoutApiModel } from '@api.stream/sdk';
export declare const getAccessTokenData: () => any;
export declare const getBaseUser: () => SDK.User;
export declare const toBaseProject: (project: Context.InternalProject) => SDK.Project;
export declare const toBaseDestination: (destination: LiveApiModel.Destination) => SDK.Destination;
export declare const toBaseSource: (source: InternalSource) => SDK.Source;
export declare const hydrateProject: (project: LiveApiModel.Project, role: SDK.Role) => Promise<Context.InternalProject>;
export declare const sceneNodeToLayer: (node: Partial<Compositor.SceneNode>) => LayoutApiModel.Layer;
export declare const nodeToLayer: (node: Compositor.DataNode) => LayoutApiModel.Layer;
export declare const layerToNode: (layer: LayoutApiModel.Layer) => Compositor.DataNode;
export declare const layoutToProject: (layoutId: LayoutApiModel.Layout['id']) => Promise<Compositor.Project>;
/**
 * Queries
 */
export declare const getUser: () => Context.InternalUser;
export declare const getProject: (id: string) => Context.InternalProject;
export declare const getProjectByLayoutId: (id: string) => Context.InternalProject;
export declare const getProjectRoom: (id: string) => SDK.Room;
