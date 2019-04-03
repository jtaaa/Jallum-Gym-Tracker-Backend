import * as express from 'express';
import { passport } from './../auth';

import CONFIG from './../config';

const router = express.Router();

router.get('/google',
  (req, res, next) => {
    req.session.return = req.headers.referer;
    next();
  },
  passport.authenticate('google', { scope: ['profile'] }),
);

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/pineapples' }),
    (req, res) => {
  res.redirect(req.session.return || CONFIG.HOMEPAGE_URL);
  delete req.session.return;
});

export default router;
