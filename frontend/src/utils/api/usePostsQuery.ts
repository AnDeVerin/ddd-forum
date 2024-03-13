import { useQuery } from '@tanstack/react-query';
import { Post } from '@/utils/types';

interface usePostsQueryParams {
  sort: 'popular' | 'recent';
  limit?: number;
}

const HOST = import.meta.env.VITE_SERVER_URL;

const fetchPosts = async (
  queryParams: usePostsQueryParams
): Promise<Post[]> => {
  const queryParamsAsStrings = Object.entries(queryParams).map(
    ([key, value]) => [key, value.toString()]
  );

  const querystring = new URLSearchParams([...queryParamsAsStrings]).toString();

  const response = await fetch(`${HOST}/posts?${querystring}`);
  const { success, data } = await response.json();
  return success ? data : [];
};

export const usePostsQuery = (queryParams: usePostsQueryParams) =>
  useQuery({
    initialData: [],
    queryKey: ['posts', queryParams],
    queryFn: () => fetchPosts(queryParams),
  });
