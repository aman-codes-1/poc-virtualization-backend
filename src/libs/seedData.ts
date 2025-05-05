import UserRepository from '../repositories/user/ListRepository';
import { initData } from './constants';
import configuration from '../config/configuration';

const { seed } = configuration;

const userRepository: UserRepository = new UserRepository();

const seedData = async () => {
  try {
    if (seed) {
      console.log('inside seed data');
      const promises = initData?.map(async (val) => {
        await userRepository.insertMany(val);
      });
      return Promise.all(promises);
    }
    return 'data available in database';
  } catch (err) {
    return err;
  }
};

export { seedData, userRepository };
