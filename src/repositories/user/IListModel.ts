import * as mongoose from 'mongoose';
import { IVersionableDocument } from '../versionable';

interface IListModel extends IVersionableDocument, mongoose.Document {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default IListModel;
