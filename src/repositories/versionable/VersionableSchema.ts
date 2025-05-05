import * as mongoose from 'mongoose';

const VersionableSchema = new mongoose.Schema({
  createdAt: {
    default: Date.now,
    type: Date,
  },
  deletedAt: {
    required: false,
    index: true,
    type: Date,
  },
  originalId: {
    required: true,
    index: true,
    type: String,
  },
});

export default VersionableSchema;
