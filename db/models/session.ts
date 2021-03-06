import { Schema } from 'mongoose';
import db from './../mongoose';

const SessionSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  duration: {
    type: Number,
  },
  muscleGroups: {
    type: [ String ],
    default: [],
    required: true,
  },
  sets: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'set',
    }],
    default: [],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const SessionModel = db.model('session', SessionSchema);

export { SessionModel };
