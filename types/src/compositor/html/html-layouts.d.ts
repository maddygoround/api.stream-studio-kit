import * as CSS from 'csstype';
import { DataNode, SceneNode } from '../index';
declare type Size = {
    x: string | number;
    y: string | number;
};
declare type Position = {
    x: string | number;
    y: string | number;
};
declare type Duration = string | number;
declare type ChildPosition = {
    position: Position;
    size: Size;
    opacity: number;
    borderRadius: number;
    zIndex: number;
    entryTransition: Transition;
    exitTransition: Transition;
    rootOffset?: {
        x: number;
        y: number;
    };
};
declare type ChildPositionIndex = {
    [nodeId: string]: ChildPosition;
};
declare type Transition = {
    delay?: Duration;
    offset?: Position;
    scale?: {
        x?: number;
        y?: number;
    };
    opacity?: number;
    timingFn?: CSS.StandardProperties['transitionTimingFunction'] | 'exit';
};
export declare type TransitionInfo = {
    entry: Transition;
    exit: Transition;
};
declare type LayoutProps = Partial<DataNode['props']>;
export declare type LayoutArgs = {
    props: LayoutProps;
    children: SceneNode[];
    size: {
        x: number;
        y: number;
    };
};
declare type LayoutResult = ChildPositionIndex | HTMLElement;
export declare class Layout extends HTMLElement {
    parentEl: HTMLElement;
    slotEl: HTMLElement;
    parentLayout: Layout;
    nodes: SceneNode[];
    mutationObserver: MutationObserver;
    latestSize: {
        x: number;
        y: number;
    };
    isFirst: boolean;
    isUpdating: boolean;
    cid: number;
    constructor();
    log(...args: any[]): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    updatePositions(options: {
        size?: {
            x: number;
            y: number;
        };
        inserted?: Set<string>;
        removed?: Set<string>;
    }): void;
    initializeChild(childEl: Partial<ChildEl>): void;
}
export declare const ensureLayoutContainer: (size: {
    x: number;
    y: number;
}) => HTMLElement;
declare type ChildEl = HTMLElement & {
    runRemove: () => Promise<void>;
    parentEl: HTMLElement;
    previousSiblingEl: ChildNode;
    nextSiblingEl: ChildNode;
    removed: boolean;
    transition?: Promise<void>;
    dataset: {
        id: string;
    };
    data: ChildPosition;
    mutationObserver?: MutationObserver;
};
export declare const layoutChildren: ({ id, props, children, size, }: LayoutArgs & {
    id: string;
}) => ChildPositionIndex;
export declare type LayoutDefinition = ({ props, children, size, }: LayoutArgs) => LayoutResult;
export declare type LayoutMap = {
    [name: string]: LayoutDeclaration;
};
export declare type LayoutName = 'Grid' | 'Free' | 'Column' | 'Row' | 'Presentation' | 'Layered';
export declare type LayoutDeclaration = {
    name: LayoutName;
    props?: any;
    layout: LayoutDefinition;
};
export declare const htmlLayouts: LayoutMap;
export declare const registerLayout: (declaration: LayoutDeclaration | LayoutDeclaration[]) => void;
export {};
