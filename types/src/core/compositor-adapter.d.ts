import { Compositor } from './namespaces';
import { LayoutApiModel } from '@api.stream/sdk';
export declare type BatchItem = LayoutApiModel.BatchLayerRequest_BatchItem;
export declare type Batch = BatchItem[];
export declare const latestUpdateVersion: {
    [id: string]: number;
};
export declare const compositorAdapter: Compositor.DBAdapter;
