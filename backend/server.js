import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import connectDB from './db/index.js';
import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';

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
    });

app.use(express.json());
app.use(cookieParser());

const apiRouter = Router();

apiRouter.use('/users', userRoute);
apiRouter.use('/posts', postRoute);

app.use('/api', apiRouter);
