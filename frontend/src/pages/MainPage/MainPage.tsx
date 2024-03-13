import { useMemo, useState } from 'react';
import { Spin, Tabs } from 'antd';

import { usePostsQuery } from '@/utils/api';
import { PostCard } from '@/components';
import type { ActiveTabKeys, PostsTab } from './MainPage.types';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<ActiveTabKeys>('popular');

  const { data: posts, isFetched } = usePostsQuery({ sort: activeTabKey });

  const tabContent = useMemo(
    () =>
      isFetched ? (
        <div className={styles.postContainer}>
          {posts?.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      ) : (
        <div className={styles.spinnerContainer}>
          <Spin />
        </div>
      ),
    [isFetched, posts]
  );

  const tabItems: PostsTab[] = useMemo(
    () => [
      {
        key: 'popular',
        label: 'Popular',
        children: tabContent,
      },
      {
        key: 'recent',
        label: 'New',
        children: tabContent,
      },
    ],
    [tabContent]
  );

  return (
    <Tabs
      activeKey={activeTabKey}
      items={tabItems}
      size="large"
      onChange={(activeKey) => setActiveTabKey(activeKey as ActiveTabKeys)}
    />
  );
};
