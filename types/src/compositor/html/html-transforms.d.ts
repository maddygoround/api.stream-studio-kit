import { Source } from '../sources';
import type { SceneNode, PropsDefinition } from '../compositor';
export declare type TransformDeclaration = {
    name: string;
    sourceType?: string;
    useSource?: (sources: Source[], nodeProps: any) => Source;
    tagName?: string;
    props?: PropsDefinition;
    create: (props: any) => TransformElementBase;
};
declare type TransformElementBase = {
    root: HTMLElement;
    /** Called anytime the Source value returned by useSource is different */
    onNewSource?: (source: Source, nodeProps: any) => void;
    /** Called anytime the node associated with the element has been updated */
    onUpdate?: (nodeProps: any) => void;
    /** Listens for all events emitted by the compositor */
    onEvent?: (name: string, payload: any) => void;
    /** Cleanup to run when node is removed from the scene tree */
    dispose?: () => void;
};
declare type TransformElement = TransformElementBase & {
    nodeId: string;
    sourceType: string;
    transformName: string;
    sourceValue?: any;
};
export declare type TransformMap = {
    [name: string]: TransformDeclaration;
};
export declare type DefaultTransformMap = {
    [sourceType: string]: TransformDeclaration['name'];
};
export declare const htmlTransforms: TransformMap;
export declare const setDefaultTransforms: (defaults?: DefaultTransformMap) => void;
export declare const registerTransform: (declaration: TransformDeclaration | TransformDeclaration[]) => void;
export declare const getElementsBySourceType: (type: string) => TransformElement[];
export declare const getElementByNodeId: (name: string) => TransformElement;
export declare const getTransformByName: (name: string) => TransformDeclaration;
export declare const updateSourceForNode: (nodeId: string) => void;
export declare const getElement: (node: SceneNode) => TransformElement;
export {};
