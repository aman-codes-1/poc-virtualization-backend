import * as mongoose from 'mongoose';

interface IVersionableDocument extends mongoose.Document {
  deletedAt: Date;
  originalId: string;
  createdAt: Date;
}

export default IVersionableDocument;
