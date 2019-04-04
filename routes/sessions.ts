import { Router } from 'express';
import * as createError from 'http-errors';

import { ensureAdmin, ensureLoggedIn } from './../auth';

import { SessionModel, SetModel, UserModel } from './../db';

const router = Router();

/**
 * Endpoint: /api/session
 * Method: GET
 * Query:
 * -  limit: Number = 10
 * Response:
 *    Description: All user session within limit
 * -  body: Array<Session>
 */
router.get('/', ensureLoggedIn(), async (req, res, next) => {
  const limit = req.query.limit || 10;
  const sessions = await SessionModel.find({ user: req.user._id }, null, { lean: true, limit });
  return res.json(sessions);
});

/**
 * Endpoint: /api/session
 * Method: POST
 * Request:
 * -  body:
 *    -   session:
 *        -   timestamp: Date
 *        -   duration: Number
 *        -   muscleGroups: Array<String>
 *        -   sets: { exercise, timestamp, duration, reps, weight, drop?, super? }
 * Response:
 *    Status: 200
 */
router.post('/', ensureLoggedIn(), async (req, res, next) => {
  if (!req.body.session) return next(createError(400, 'No session property found in request body.'));
  if (!req.body.session.sets || !Array.isArray(req.body.session.sets)) return next(createError(400, 'No sets property on session found or value is not an array.'))

  try {
    const sets = await SetModel.create(req.body.session.sets);
    const session = await SessionModel.create({ ...req.body.session, sets, user: req.user._id });
    await UserModel.updateOne({ _id: req.user }, { $addToSet: { sessions: session._id } });
  } catch (err) {
    if (err.name === 'ValidationError')
      return next(createError(400, { errors: err.errors }));
    return next(err);
  }
  return res.sendStatus(200);
});

export default router;
