import * as HtmlTransforms from './html/html-transforms';
import * as HtmlLayouts from './html/html-layouts';
import * as Sources from './sources';
export * as Transform from './html/html-transforms';
export * as Layout from './html/html-layouts';
export * as Source from './sources';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ls-layout': any;
        }
    }
}
export declare type PropDefinition = {
    required?: boolean;
    default?: any;
    type?: typeof String | typeof Number | typeof Boolean | typeof Array | typeof Object;
};
export declare type PropsDefinition = {
    [name: string]: PropDefinition;
};
export declare type NodeId = string;
export declare type DataNode = {
    id: NodeId;
    props: {
        [prop: string]: any;
    };
    childIds: NodeId[];
};
export declare type SceneNode = {
    id: NodeId;
    props: DataNode['props'] & {
        type?: string;
        sourceType?: string;
        sourceProps?: {
            [prop: string]: any;
        };
        layout?: string;
        layoutProps?: {
            [prop: string]: any;
        };
        objectFit?: 'contain' | 'cover' | 'fill';
        opacity?: number;
        size?: {
            x: number;
            y: number;
        };
        position?: {
            x: number;
            y: number;
        };
    };
    children: SceneNode[];
    _deleted?: boolean;
};
export declare type DB = {
    insert: (props: DataNode['props'], parentId?: NodeId, index?: number) => Promise<NodeId>;
    update: (id: NodeId, props: DataNode['props']) => Promise<void>;
    remove: (id: NodeId) => Promise<void>;
};
declare type LocalDB = {
    insert: (node: Partial<SceneNode>, parentId?: NodeId, index?: number) => Promise<NodeId>;
    update: (id: NodeId, props: DataNode['props'], childIds?: NodeId[]) => Promise<void>;
    remove: (id: NodeId) => Promise<void>;
};
export declare type DBAdapter = (projectId: NodeId | null, queries: {
    get: (id: NodeId) => DataNode;
    getParent: (id: NodeId) => DataNode;
}) => DB;
export declare type Settings = {
    dbAdapter: DBAdapter;
};
export declare type CompositorInstance = {
    layouts: HtmlLayouts.LayoutMap;
    transforms: HtmlTransforms.TransformMap;
    sources: Sources.SourceMap;
    registerLayout: typeof HtmlLayouts.registerLayout;
    registerTransform: typeof HtmlTransforms.registerTransform;
    registerSource: typeof Sources.registerSource;
    triggerEvent: EventHandler;
    subscribe: (cb: EventHandler) => Disposable;
    useEvent: (event: string, cb: EventHandler) => Disposable;
    getSources: (type: string) => Sources.Source[];
    addSource: (type: string, source: Sources.NewSource) => void;
    setSourceActive: (id: string, value: boolean) => void;
    updateSource: (id: string, props: Sources.Source['props']) => void;
    removeSource: (id: string) => void;
    createProject: (props?: any, id?: NodeId) => Promise<Project>;
    loadProject: (root: SceneNode, id?: NodeId) => Project;
    getProject: (id: string) => Project;
    getNodeProject: (id: string) => Project;
    getNodeParent: (id: string) => SceneNode;
    getNode: (id: string) => SceneNode;
};
export declare type Project = DB & {
    id: NodeId;
    getRoot: () => SceneNode;
    nodes: SceneNode[];
    get: (id: NodeId) => SceneNode;
    getParent: (id: NodeId) => SceneNode;
    local: LocalDB;
    reorder: (parentId: NodeId, childIds: NodeId[], send?: boolean) => Promise<void>;
    move: (id: NodeId, newParentId: NodeId, index?: number, tween?: boolean, send?: boolean) => Promise<void>;
    swap: (idA: NodeId, idB: NodeId) => Promise<void>;
};
declare type EventHandler = (event: string, payload?: any) => void;
declare type Disposable = () => void;
export declare const start: (settings: Settings) => CompositorInstance;
