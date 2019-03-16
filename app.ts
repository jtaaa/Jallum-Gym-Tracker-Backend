import * as dotenv from 'dotenv'; dotenv.config();
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
