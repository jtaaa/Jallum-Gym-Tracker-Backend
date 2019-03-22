import { Schema } from 'mongoose';
import db from './../mongoose';

const SetSchema = new Schema({
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'exercise',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  duration: {
    type: Number,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
  },
  drop: {
    type: Schema.Types.ObjectId,
    ref: 'set',
  },
  super: {
    type: Schema.Types.ObjectId,
    ref: 'set',
  },
});

const SetModel = db.model('set', SetSchema);

export { SetModel };
