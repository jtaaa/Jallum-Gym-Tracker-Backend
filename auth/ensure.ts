import { UserModel } from './../db';
import { NextFunction, Response, Request } from 'express';

const ensureLoggedIn = (redirectTo?: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (redirectTo) res.redirect(redirectTo);
      else            res.status(401).send('User is not logged in.');
    } else            next();
  }

const ensureAdmin = () => (req, res, next) => {
  if (!req.user) {
    next({ statusCode: 401, message: 'No user logged in.' });
  } else {
    UserModel.findById(req.user._id)
      .lean()
      .exec()
      .then(user => user.roles.includes('admin') ?
          next()
        : next({
            statusCode: 401,
            message: 'User is not an admin.'
          })
      )
      .catch(err => {
        console.error(err);
        next(err);
      });
  }
};

export {
  ensureLoggedIn,
  ensureAdmin,
}
