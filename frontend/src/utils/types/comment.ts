export interface Comment {
  id: number;
  memberId: number;
  parentCommentId: number | null;
  postId: number;
  text: string;
}
