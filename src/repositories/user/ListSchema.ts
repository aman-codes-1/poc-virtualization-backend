import * as mongoose from 'mongoose';
import { VersionableSchema } from '../versionable';

const ListSchema = new mongoose.Schema({
  ...VersionableSchema.obj,
  _id: String,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    index: true,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  geolocation: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    required: false,
    trim: true,
  },
  company: {
    type: String,
    required: false,
    trim: true,
  },
  fullDetails: [
    {
      businessHistory: {
        name: {
          type: String,
          required: false,
          trim: true,
        },
        date: {
          type: String,
          required: false,
          trim: true,
        },
        amount: {
          type: String,
          required: false,
          trim: true,
        },
      },
      accountHistory: {
        name: {
          type: String,
          required: false,
          trim: true,
        },
        number: {
          type: String,
          required: false,
          trim: true,
        },
        type: {
          type: String,
          required: false,
          trim: true,
        },
      },
    },
  ],
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

export default ListSchema;
