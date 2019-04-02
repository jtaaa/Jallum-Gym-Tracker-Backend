import { Router } from 'express';

import { ensureLoggedIn } from './../auth';

import { UserModel } from './../db';

const router = Router();

/**
 * Endpoint: /api/users
 * Method: GET
 * Query:
 * -  exercise: Number = 0
 * Response:
 *    Description: User information including sessions with sets
 * -  body: User
 */
router.get('/', ensureLoggedIn(), async (req, res, next) => {
  const user = await UserModel.findById(req.user, null, { lean: true }).populate({
    path: 'sessions',
    populate: {
      path: 'sets',
      populate: req.query.exercise ? 
        { path: 'exercise' }
      : undefined,
    },
  });
  return res.json(user);
});

export default router;
