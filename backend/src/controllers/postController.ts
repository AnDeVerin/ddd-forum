import { RequestHandler } from 'express';
import { getRecentPosts } from '../models/postModel';

export const getPosts: RequestHandler = async (req, res, next) => {
  const { sort, limit } = req.query;

  try {
    if (sort === 'recent') {
      const posts = await getRecentPosts(Number(limit) || undefined);

      res.status(200).send({
        error: undefined,
        data: posts,
        success: true,
      });
    } else if (sort === 'popular') {
      res.status(404).send('Not implemented yet');
    } else {
      res.status(2404).send('Not implemented yet');
    }
  } catch (error) {
    next(error);
  }
};
