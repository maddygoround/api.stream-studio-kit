import { Compositor } from '../namespaces';
export declare type RoomParticipantSource = {
    id: string;
    value: MediaStream;
    props: {
        id: string;
        type: 'screen' | 'camera';
        displayName: string;
        videoEnabled: boolean;
        audioEnabled: boolean;
    };
};
export declare const RoomParticipant: Compositor.Source.SourceDeclaration;
export declare const RoomVideo: Compositor.Source.SourceDeclaration;
export declare const RoomAudio: Compositor.Source.SourceDeclaration;
