export interface PostCardProps {
  title: string;
  id: number;
  createdAt: Date;
  author: { id: number; username: string };
  commentsCount?: number;
  rating: number;
}
