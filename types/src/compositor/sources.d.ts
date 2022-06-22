import type { PropsDefinition, CompositorInstance } from './compositor';
declare type SourceMethods = Pick<CompositorInstance, 'removeSource' | 'updateSource' | 'setSourceActive' | 'triggerEvent'> & {
    addSource: (source: NewSource) => void;
};
export declare type SourceDeclaration = {
    /** The type to declare support for (e.g. 'MediaStreamVideo') */
    type: string;
    /** The value-type constructor of a Source (e.g. MediaStream) */
    valueType: any;
    /** The properties associated with an individual Source */
    props?: PropsDefinition;
    init?: (methods: SourceMethods) => void;
};
export declare type Source = {
    id: string;
    name?: string;
    type: string;
    /** Indicates whether a source is ready to be rendered to the page */
    isActive: boolean;
    /** Properties matching the schema supplied to SourceDeclaration for this Source type */
    props: {
        [prop: string]: any;
    };
    value: any;
};
export declare type NewSource = {
    id: string;
    value: any;
    isActive?: boolean;
    props: {
        [prop: string]: any;
    };
};
export declare type SourceMap = {
    [type: string]: SourceDeclaration;
};
export declare const sourceTypes: SourceMap;
export declare const registerSource: (declaration: SourceDeclaration | SourceDeclaration[]) => void;
export {};
