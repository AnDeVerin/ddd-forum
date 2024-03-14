import { RequestHandler } from 'express';

import { getRecentPosts } from '../models/postModel';
import { ResponseDTO } from '../utils/ResponseDTO';

export const getPosts: RequestHandler = async (req, res, next) => {
  const { /*sort,*/ limit } = req.query;

  try {
    const posts = await getRecentPosts(Number(limit) || undefined);

    res.status(200).send(new ResponseDTO(posts, undefined));
  } catch (error) {
    next(error);
  }
};
