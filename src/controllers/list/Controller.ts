/* eslint-disable class-methods-use-this */
import {
  Request, Response, NextFunction,
} from 'express';

import {
  NO_MORE_CONTENT,
  DATA_FETCHED_SUCCESSFULLY,
  NOT_FOUND,
  UPDATED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
} from '../../libs/constants';
import ListRepository from '../../repositories/user/ListRepository';
import { myCache } from '../../libs/routes/cachedEmails';
import { myCountCache } from '../../libs/routes/cachedCounts';

const listRepository: ListRepository = new ListRepository();

class Lists {
  // READ-ALL
  getAll = async (req, res: Response, next: NextFunction) => {
    try {
      const { cursor: mycursor = '', limit = 100 } = req.query;
      console.log('Inside getAll controller with payload inside query :: ', req.query);
      let node;
      let finalQuery;
      console.time('Time taken to fetch data from database :');
      if (mycursor.startsWith('-')) {
        finalQuery = {
          deletedAt: undefined,
          originalId: { $lt: mycursor.substring(1) },
        };
        node = await listRepository
          .find(finalQuery)
          .sort({ originalId: -1 })
          .limit(+(limit));
        node = node.reverse();
      } else {
        finalQuery = {
          deletedAt: undefined,
          originalId: { $gt: mycursor },
        };
        node = await listRepository
          .find(finalQuery)
          .sort({ originalId: 1 })
          .limit(+(limit));
      }
      console.timeEnd('Time taken to fetch data from database :');

      const nodeLength = node.length;
      if (!nodeLength) {
        return res.status(204).json({
          message: NO_MORE_CONTENT,
        });
      }

      // If user is trying to fetch data without limit
      if (Object.keys(req.query).length === 0) {
        return res.status(200).json({
          message: DATA_FETCHED_SUCCESSFULLY,
          count: nodeLength,
          node,
        });
      }

      // Additional Info in response for pagination
      const { originalId: cursor } = node[nodeLength - 1];
      const { originalId: lastCursor } = node[0];
      console.time('Time taken to check if NextPage exists :');
      const { name } = await listRepository
        .findOne({ originalId: { $gt: cursor } })
        .select({ name: 1 });
      console.timeEnd('Time taken to check if NextPage exists :');

      return res.status(200).json({
        message: DATA_FETCHED_SUCCESSFULLY,
        cursor,
        count: nodeLength,
        node,
        pageInfo: {
          hasNextPage: !!name,
          endCursor: lastCursor,
        },
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  };

  // Count
  getActiveDocCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Inside count controller');
      console.time('count performance');
      const count = await listRepository
        .find({ deletedAt: undefined })
        .select({ _id: 1 })
        .count();
      console.timeEnd('count performance');
      return res.status(200).json({
        message: DATA_FETCHED_SUCCESSFULLY,
        count,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  };

  // GET-EMAILS
  getEmailsOneGo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Inside getEmailsOneGo controller with payload inside query :: ', req.query);
      const limit = Math.abs(JSON.parse(req.query.limit as string));
      console.time('Time taken to getEmails in One go :');
      const node = await listRepository.findAll({}, { _id: false, originalId: 1, email: 1 })
        .limit(limit)
        .lean();
      console.timeEnd('Time taken to getEmails in One go :');
      await myCache.set('emails', node);
      return res.status(200).json({
        message: DATA_FETCHED_SUCCESSFULLY,
        node,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  };

  // READ-ONE
  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Inside getOne controller with payload inside params :: ', req.params);
      const finalQuery = { deletedAt: undefined, ...req.params };
      console.time('Time taken to fetch one Data :');
      const data = await listRepository.findOne(finalQuery);
      if (data) {
        return res.status(200).json({
          message: DATA_FETCHED_SUCCESSFULLY,
          data,
        });
      }
      console.timeEnd('Time taken to fetch one Data :');
      return res.status(401).json({
        message: NOT_FOUND,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  };

  // UPDATE
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Inside update controller');
      console.log('OriginalId for data to be updated :: ', req.params);
      console.log('Fields of data to be updated :: ', req.body);
      const { originalId } = req.params;
      const { rest } = req.body;
      const finalQuery = { deletedAt: undefined, originalId };
      console.time('Time taken to update one Data :');
      const data = await listRepository.updateOne(finalQuery, rest);
      if (data) {
        return res.status(200).json({
          message: UPDATED_SUCCESSFULLY,
          data,
        });
      }
      console.timeEnd('Time taken to update one Data :');
      return res.status(404).json({
        message: NOT_FOUND,
      });
    } catch (err) {
      return next({
        message: err.message,
        status: 500,
      });
    }
  };

  // DELETE
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originalId } = req.params;
      console.log('originalId in delete request :', originalId);
      console.time('Time taken to delete one Data :');
      const data = await listRepository.delete({ originalId });
      console.time('Time taken to delete one Data :');
      res.status(200).json({
        message: DELETED_SUCCESSFULLY,
        data,
      });
    } catch (err) {
      next({
        message: err.message,
        status: 500,
      });
    }
  };
}

const myList = new Lists();

export default myList;
