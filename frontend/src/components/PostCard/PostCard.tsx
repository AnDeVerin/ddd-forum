import { differenceInCalendarDays } from 'date-fns';

import { PostCardProps } from './PostCard.types';
import styles from './PostCard.module.css';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Link from 'antd/es/typography/Link';

const getPostAge = (postDate: Date) => {
  const diffInDays = differenceInCalendarDays(new Date(), postDate);
  return diffInDays ? `${diffInDays} days ago` : 'Today';
};

export const PostCard = (props: PostCardProps) => {
  const { title, id, createdAt, author, commentsCount, rating } = props;

  return (
    <article className={styles.card}>
      <div className={styles.vote}>
        <Button shape="circle" icon={<UpOutlined />} size="small" type="text" />
        {rating}
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
        {getPostAge(createdAt)} | by&nbsp;
        <Link href={`members/${author.username}`} target="_blank">
          {author.username}&nbsp;
        </Link>
        | {commentsCount ?? 0}
        &nbsp;comments
      </div>
    </article>
  );
};
