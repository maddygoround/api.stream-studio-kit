/**
 * This file contains logical helpers with zero app dependencies
 *  that produce no side effects (pure functions)
 */
import type * as Compositor from './compositor/index';
export { pick, pull, omit, isEqual, cloneDeep, sortBy, debounce, camelCase, kebabCase, isArray, } from 'lodash-es';
import deepEqual from 'fast-deep-equal';
export { deepEqual };
export declare const generateId: () => string;
export declare const insertAt: <T>(index: number, ins: T | T[], arr: T[], replace?: boolean) => (T | (T extends readonly (infer InnerArr)[] ? InnerArr : T))[];
export declare const replaceItem: <T>(match: T | ((item: T) => Boolean), newItem: T, arr: T[]) => (T | (T extends readonly (infer InnerArr)[] ? InnerArr : T))[];
export declare const swapIndex: <T>(indexA: number, indexB: number, arr: T[]) => T[];
export declare const swapItems: <T extends string | number>(itemA: T, itemB: T, arr: T[]) => T[];
export declare const toDataNode: (node: Compositor.SceneNode) => Compositor.DataNode;
export declare const toSceneNode: (node: Compositor.DataNode) => Compositor.SceneNode;
export declare const toSceneTree: (nodes: Compositor.DataNode[], rootId: Compositor.NodeId) => Compositor.SceneNode;
export declare const forEachDown: (node: Compositor.SceneNode, fn: (next: Compositor.SceneNode, parent?: Compositor.SceneNode) => void) => void;
declare type GraphNode = {
    children?: GraphNode[];
};
export declare const mapDown: <T extends GraphNode, U extends GraphNode>(node: T, fn: (next: T) => U) => U;
export declare const mapDownAsync: (node: Compositor.SceneNode, fn: (next: Compositor.SceneNode) => Promise<Compositor.SceneNode>) => Promise<Compositor.SceneNode>;
export declare const getElementAttributes: (x: HTMLElement) => {
    [props: string]: string;
};
export declare const asArray: <T>(x: T | T[]) => T[];
export declare const sizeToNum: (x: string | number | null, parentSize: number) => number;
export declare const asSize: (x: string | number | null) => string;
export declare const asDuration: (x: string | number | null) => string;
/** Convert a Map to an array of its values */
export declare const values: <T>(map: Map<any, T>) => T[];
