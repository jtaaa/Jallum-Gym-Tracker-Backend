import * as passport from 'passport';
import { OAuth2Strategy as GoogleStategy } from 'passport-google-oauth';

import CONFIG from '../config';
import { UserModel } from './../db';

passport.use(new GoogleStategy(
  {
    clientID: CONFIG.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: CONFIG.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: `${CONFIG.API_URL}/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    UserModel.findOneAndUpdate(
      { googleId: profile.id },
      {  ...profile, googleId: profile.id, photos: [ profile.photos[0].value ] },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    )
      .lean()
      .exec()
      .then(doc => done(null, doc))
      .catch(err => {
        console.error(err);
        done(err);
      });
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

export { passport };
