import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error';
import userRouter from './routes/User';
import exchangeRouter from './routes/Exchange';

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(exchangeRouter);

app.use(errorHandler);

export default app;
