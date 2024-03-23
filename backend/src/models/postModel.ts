import { getRecentPosts as getRecent } from '../utils/db';

const defaultLimit = 100;

export const getRecentPosts = async (limit: number | undefined) => {
  const posts = await getRecent(limit || defaultLimit);
  return posts;
};
