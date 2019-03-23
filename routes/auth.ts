import * as express from 'express';
import { passport } from './../auth';

import CONFIG from './../config';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/pineapples' }),
    (req, res) => {
  console.log('authenticated');
  res.redirect(CONFIG.HOMEPAGE_URL);
});

export default router;
