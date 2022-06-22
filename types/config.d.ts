import { Compositor } from './src';
declare const _default: (env: 'dev' | 'stage' | 'prod') => {
    defaults: {
        previewTokenDuration: number;
        guestTokenDuration: number;
        transforms: Compositor.Transform.DefaultTransformMap;
    };
};
export default _default;
