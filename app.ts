import * as dotenv from 'dotenv'; dotenv.config();
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import { passport, session } from './auth';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import exerciseRouter from './routes/exercise';
import sessionRouter from './routes/session';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/exercise', exerciseRouter);
app.use('/api/session', sessionRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  if (err.statusCode) {
    res.status(err.statusCode).json({ error: err });
  } else {
    res.status(500).json({ error: err });
  }
});

export default app;
