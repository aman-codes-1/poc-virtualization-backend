/* eslint-disable no-underscore-dangle */
import * as NodeCache from 'node-cache';
import {
  DATA_FETCHED_SUCCESSFULLY,
} from '../constants';

export const myCache = new NodeCache({ stdTTL: 180 });

// GET-EMAILS-FROM-NODE_CACHE
const cachedEmails = async (req, res, next) => {
  console.log('inside cached_emails');
  const emails = await myCache.has('emails');
  const node = myCache.get('emails');

  if (emails) {
    res.status(200).json({
      message: DATA_FETCHED_SUCCESSFULLY,
      node,
    });
    return;
  }

  next();
};

export default cachedEmails;
