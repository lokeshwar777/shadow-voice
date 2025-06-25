import { allowedOrigins } from './allowedOrigins.js';

// cross origin resource sharing
// you might get origin as undefined in dev env, so use !origin
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            // console.log('Incoming Origin:', origin);
            // console.log('Allowed Origins:', allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

export { corsOptions };
