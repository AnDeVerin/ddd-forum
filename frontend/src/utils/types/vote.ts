export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export interface Vote {
  id: number;
  memberId: number;
  postId: number;
  voteType: VoteType;
}
