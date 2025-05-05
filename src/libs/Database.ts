import * as mongoose from 'mongoose';
import { seedData } from './seedData';

export default class Database {
  public static open(mongoURL) {
    return new Promise((resolve, reject) => {
      mongoose.connect(mongoURL, async (error) => {
        if (error) {
          console.log('Cannot connect with mongoDB server');
          return reject(error);
        }
        console.log('connected to mongoDB successfully');
        await seedData();
        return resolve('Connected successfully');
      });
    });
  }

  public static disconnect(mongoURL) {
    mongoose.disconnect(mongoURL);
  }
}
