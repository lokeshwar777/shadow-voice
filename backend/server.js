import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import { corsOptions } from './config/corsOptions.js';
import { getAIOpinion } from './ai/AIOpinion.js';
import connectDB from './db/index.js';
import { authenticateUser } from './middlewares/auth.middleware.js';
import pollRoute from './routes/poll.route.js';
import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';
import commentRoute from './routes/comment.route.js';

const app = express();

const PORT = process.env.PORT || 3500;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on PORT : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`MONGODB connection failed, here's the error ${err}`);
        process.exit(1);
    });

// app.use(cors(corsOptions)); // skip cors temporarily
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const apiRouter = Router();
apiRouter.use('/users', userRoute);
apiRouter.use(authenticateUser);
apiRouter.use('/posts', postRoute);
apiRouter.use('/polls', pollRoute);
apiRouter.use('/comments', commentRoute);
apiRouter.post('/ai/opinion', getAIOpinion);

app.use('/api', apiRouter);
