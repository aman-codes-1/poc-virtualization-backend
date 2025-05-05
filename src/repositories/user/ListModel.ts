import * as mongoose from 'mongoose';
import IListModel from './IListModel';
import ListSchema from './ListSchema';

const ListModel: mongoose.Model<IListModel> = mongoose.model<IListModel>('Users', ListSchema);

export default ListModel;
