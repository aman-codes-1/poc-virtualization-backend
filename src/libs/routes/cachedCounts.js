/* eslint-disable no-underscore-dangle */
import * as NodeCache from 'node-cache';
import {
  DATA_FETCHED_SUCCESSFULLY,
} from '../constants';

export const myCountCache = new NodeCache({ stdTTL: 3600 });

// GET-EMAILS-FROM-NODE_CACHE
const cachedCounts = async (req, res, next) => {
  console.log('inside cached_counts');
  const counts = await myCountCache.has('counts');
  const count = myCountCache.get('counts');
  console.log(counts);
  if (counts) {
    res.status(200).json({
      message: DATA_FETCHED_SUCCESSFULLY,
      count,
    });
    return;
  }

  next();
};

export default cachedCounts;
