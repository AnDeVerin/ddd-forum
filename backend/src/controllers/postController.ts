import { RequestHandler } from 'express';

import { getRecentPosts } from '../models/postModel';

export const getPosts: RequestHandler = async (req, res, next) => {
  const { sort, limit } = req.query;

  try {
    const posts = await getRecentPosts(Number(limit) || undefined);

    res.status(200).send({
      error: undefined,
      data: posts,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
