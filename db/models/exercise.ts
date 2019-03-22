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
});

const ExerciseModel = db.model('exercise', ExerciseSchema);

export { ExerciseModel };
