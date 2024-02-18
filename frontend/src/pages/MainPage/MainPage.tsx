import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { PostCard } from '@/components';
import styles from './MainPage.module.css';

const posts = [
  {
    title: 'Domain services vs Application services',
    id: 1,
    createdAt: new Date('2024-01-01T08:30:00.0Z'),
    author: { id: 1, username: 'stemmlerjs' },
    commentsCount: 5,
    rating: 999,
  },
  {
    title: 'Ports and Adapters',
    id: 2,
    createdAt: new Date('2024-02-12T10:10:00.0Z'),
    author: { id: 1, username: 'stemmlerjs' },
    commentsCount: 3,
    rating: 6,
  },
  {
    title: 'An Introduction to Domain-Driven design - DDD w/ TypeScript',
    id: 3,
    createdAt: new Date('2024-02-17T10:10:00.0Z'),
    author: { id: 1, username: 'stemmlerjs' },
    rating: 2,
  },
  {
    title: "Today's Post",
    id: 4,
    createdAt: new Date(),
    author: { id: 1, username: 'stemmlerjs' },
    rating: 1,
  },
];

export const MainPage = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'popular',
      label: 'Popular',
      children: (
        <div className={styles.postContainer}>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      ),
    },
    {
      key: 'new',
      label: 'New',
      children: (
        <div className={styles.postContainer}>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="popular" items={tabItems} size="large" />
    </>
  );
};
