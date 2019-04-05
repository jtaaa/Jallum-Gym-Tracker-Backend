import { Schema } from 'mongoose';
import db from './../mongoose';

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  primaryMuscleGroups: {
    type: [ String ],
    default: [],
    required: true,
  },
  secondaryMuscleGroups: {
    type: [ String ],
    default: [],
    required: true,
  },
  defaultWeight: {
    type: Number,
    default: 30,
    required: true,
  },
  defaultReps: {
    type: Number,
    default: 10,
    required: true,
  }
});

const ExerciseModel = db.model('exercise', ExerciseSchema);

export { ExerciseModel };
