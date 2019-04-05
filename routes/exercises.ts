import { Router } from 'express';
import * as createError from 'http-errors';

import { ExerciseModel } from './../db';

const router = Router();

/**
 * Endpoint: /api/exercises
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
 * Endpoint: /api/exercises
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
    const newExercise = await ExerciseModel.create(req.body);
    return res.status(200).send(newExercise);
  } catch (err) {
    if (err.name === 'ValidationError')
      return next(createError(400, { errors: err.errors }));
    return next(err);
  }
});

export default router;
