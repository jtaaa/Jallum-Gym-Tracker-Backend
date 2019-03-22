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
    type: [ Schema.Types.ObjectId ],
    ref: 'set',
    default: [],
    required: true,
  },
});

const SessionModel = db.model('session', SessionSchema);

export { SessionModel };
