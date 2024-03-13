import { differenceInCalendarDays } from 'date-fns';

import styles from './PostCard.module.css';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';
import { Post, Vote, VoteType } from '@/utils/types';

const getPostAge = (postDate: Date) => {
  const diffInDays = differenceInCalendarDays(new Date(), postDate);
  return diffInDays ? `${diffInDays} days ago` : 'Today';
};

const getRating = (votes: Vote[]) => {
  return votes.reduce((acc, vote) => {
    return acc + (vote.voteType === VoteType.UPVOTE ? 1 : -1);
  }, 0);
};

export const PostCard = (props: Post) => {
  const { title, id, createdAt, votes, memberPostedBy, comments } = props;

  return (
    <article className={styles.card}>
      <div className={styles.vote}>
        <Button shape="circle" icon={<UpOutlined />} size="small" type="text" />
        {getRating(votes)}
        <Button
          shape="circle"
          icon={<DownOutlined />}
          size="small"
          type="text"
        />
      </div>
      <Title level={3} style={{ margin: 0 }}>
        {title}&nbsp;
        <Link href={`posts/${id}`} target="_blank">
          [link]
        </Link>
      </Title>
      <div className={styles.subtitleContainer}>
        {getPostAge(new Date(createdAt))} | by&nbsp;
        <Link href={`members/${memberPostedBy.user.username}`} target="_blank">
          {memberPostedBy.user.username}&nbsp;
        </Link>
        | {comments.length ?? 0}
        &nbsp;comments
      </div>
    </article>
  );
};
