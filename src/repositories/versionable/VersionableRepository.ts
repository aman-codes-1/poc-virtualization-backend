import {
  Query,
  HydratedDocument,
  Document,
  Model,
  Types,
  QueryWithHelpers,
} from 'mongoose';

export default class VersionableRepository<I extends Document, M extends Model<I>> {
  private Model: M;

  constructor(model) {
    this.Model = model;
  }

  // ID-GENERATOR
  public static generateObjectId() {
    return String(new Types.ObjectId());
  }

  // FIND-ONE
  public versionableFindOne(query: any)
    : Query<HydratedDocument<I, {}>, HydratedDocument<I, {}>, {}, I> {
    return this.Model
      .findOne(query)
      .lean();
  }

  // FIND-ALL
  // eslint-disable-next-line no-unused-vars
  public versionableFind(query, projection?: any, options?: any)
    : Query<HydratedDocument<I, {}>[], HydratedDocument<I, {}>> {
    return this.Model
      .find(query)
      .select({ _id: 0, __v: 0 })
      .lean();
  }

  // FIND-ALL-2
  public versionableFindAll(query: any = {}, projection: any = {}, options: any = {})
    : Query<HydratedDocument<I, {}>[], HydratedDocument<I, {}>> {
    const finalQuery = { deletedAt: undefined, ...query };
    return this.Model.find(finalQuery, projection, options);
  }

  // COUNT
  public versionableCount(query): Query<number, HydratedDocument<I, {}>, {}, I> {
    const finalQuery = { deletedAt: undefined, ...query };
    return this.Model.countDocuments(finalQuery);
  }

  // CREATE DATA
  public versionableCreate(data: any): Promise<I> {
    console.log('VersionableRepository : create');
    const id = VersionableRepository.generateObjectId();

    const model = new this.Model(
      {
        _id: id,
        originalId: id,
        ...data,
      },
    );
    return model.save();
  }

  // BULK INSERT

  public versionableInsertMany(data: any): Promise<HydratedDocument<I, {}, {}>[]> {
    console.log('VersionableRepository : create many');
    const id = VersionableRepository.generateObjectId();

    return this.Model.insertMany(
      {
        _id: id,
        originalId: id,
        ...data,
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  softDelete({ originalId }) {
    return this.Model.updateOne({ originalId, deletedAt: undefined }, { deletedAt: Date.now() });
  }

  // UPDATE DATA
  public async update(filterQuery: any, data): Promise<I> {
    const prevData: any = await this.versionableFindOne({ ...filterQuery });
    if (prevData.name) {
      const { originalId } = prevData;
      await this.softDelete({ originalId });
    } else {
      console.log('No user found for given originalId');
      return undefined;
    }
    const newData = { ...prevData, ...data };
    // eslint-disable-next-line no-underscore-dangle
    newData._id = VersionableRepository.generateObjectId();
    const model = new this.Model(newData);
    console.log('User updated successfully');
    return model.save();
  }

  // UPDATE MANY
  public versionableUpdateMany(filter: any, data: any, options: any)
    : QueryWithHelpers<any, any, any, any> {
    console.log('VersionableRepository : update many');

    return this.Model.updateMany(
      filter,
      data,
      options,
    );
  }
}
