import { Compositor } from '../namespaces';
declare type LayoutArgs = Compositor.Layout.LayoutArgs;
export declare const Free: Compositor.Layout.LayoutDeclaration;
export declare const Column: Compositor.Layout.LayoutDeclaration;
export declare const Row: Compositor.Layout.LayoutDeclaration;
export declare const Grid: {
    name: string;
    layout: ({ props, children, size }: LayoutArgs) => HTMLElement;
};
export declare const Presentation: Compositor.Layout.LayoutDeclaration;
export declare const Layered: Compositor.Layout.LayoutDeclaration;
export {};
