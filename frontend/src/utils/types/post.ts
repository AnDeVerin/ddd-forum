import { Comment, User, Vote } from '@/utils/types';

export interface Post {
  comments: Comment[];
  content: string;
  createdAt: string;
  id: number;
  memberId: number;
  memberPostedBy: { id: number; userId: number; user: User };
  postType: string;
  title: string;
  votes: Vote[];
}
