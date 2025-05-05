import * as mongoose from 'mongoose';
import IListModel from './IListModel';
import ListModel from './ListModel';
import { VersionableRepository } from '../versionable';

export default class ListRepository
  extends VersionableRepository<IListModel, mongoose.Model<IListModel>> {
  constructor() {
    super(ListModel);
  }

  // ID-GENERATOR
  public static generateObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  // CREATE
  public create(data: any): Promise<IListModel> {
    return super.versionableCreate(data);
  }

  // INSERT-MANY
  public insertMany(query): Promise<any> {
    return super.versionableInsertMany(query);
  }

  // FIND-ONE
  public findOne(query): mongoose.Query<IListModel, IListModel> {
    return super.versionableFindOne(query);
  }

  // FIND-ALL
  public find(query, projection?: any, options?: any): mongoose.Query<IListModel[], IListModel> {
    return super.versionableFind(query, projection, options);
  }

  // FIND-ALL-2
  public findAll(query, projection?: any, options?: any): mongoose.Query<IListModel[], IListModel> {
    return super.versionableFindAll(query, projection, options);
  }

  // COUNT
  public count(options): mongoose.Query<number, IListModel> {
    return super.versionableCount(options);
  }

  // UPDATE
  public updateOne(filterQuery: any, data): mongoose.UpdateQuery<IListModel> {
    return super.update(filterQuery, data);
  }

  // UPDATE MANY
  public updateMany(filter, update: any, options?: any)
    : mongoose.QueryWithHelpers<any, any, any, any> {
    return super.versionableUpdateMany(filter, update, options);
  }

  // DELETE
  public delete(data: any): mongoose.Query<object, IListModel> {
    return super.softDelete(data);
  }
}
