import { Router } from 'express';
import * as createError from 'http-errors';
import { ExerciseModel } from './../db';

const router = Router();

/**
 * Endpoint: /api/exercise
 * Method: GET
 * Response:
 *    Description: All exercises
 * -  body: Array<Exercise>
 */
router.get('/', async (req, res, next) => {
  const exercises = await ExerciseModel.find({}, null, { lean: true });
  res.json(exercises);
});

/**
 * Endpoint: /api/exercise
 * Method: PUT
 * Request:
 * -  body:
 *    -   name: String
 *    -   primaryMuscleGroups: Array<String>
 *    -   secondaryMuscleGroups: Array<String>
 * Response:
 *    Status: 200
 */
router.put('/', async (req, res, next) => {
  try {
    await ExerciseModel.create(req.body);
  } catch (err) {
    if (err.name === 'ValidationError')
      return next(createError(400, { errors: err.errors }));
    return next(err);
  }
  return res.sendStatus(200);
});

export default router;
