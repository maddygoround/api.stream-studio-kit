import { SDK } from './namespaces';
declare type ModelName = 'User' | 'Project' | 'Source' | 'Destination' | 'Node';
declare type Models = {
    User: SDK.User;
    Project: SDK.Project;
    Source: SDK.Source;
    Destination: SDK.Destination;
    Node: SDK.SceneNode;
};
export declare function useModel<M extends ModelName>(model: M, id: string, cb: (model: Models[M]) => void): SDK.Disposable;
export declare function useModels<M extends ModelName>(model: M, cb: (ids: string[]) => void): SDK.Disposable;
export {};
