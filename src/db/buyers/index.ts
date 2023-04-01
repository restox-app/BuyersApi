import { Schema, SchemaTypes } from 'mongoose';
import { db } from '../config';
import { BUYERS_SCHEMA } from './types';

const buyers_schema = new Schema<BUYERS_SCHEMA>({
  name: {
    type: SchemaTypes.String,
    maxlength: 256,
    required: true,
  },
  contact: {
    type: SchemaTypes.String,
    maxlength: 13,
  },
}, {
  timestamps: true,
});

export const buyers = db.model<BUYERS_SCHEMA>(
  'buyers',
  buyers_schema,
);
