import { Spin, Tabs } from 'antd';
import { useMemo, useState } from 'react';

import { PostCard } from '@/components';
import { usePostsQuery } from '@/utils/api';

import { TabKeys } from './MainPage.constants';
import styles from './MainPage.module.css';
import type { PostsTab } from './MainPage.types';

export const MainPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<TabKeys>(TabKeys.POPULAR);

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
        key: TabKeys.POPULAR,
        label: 'Popular',
        children: tabContent,
      },
      {
        key: TabKeys.RECENT,
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
      onChange={(activeKey) => setActiveTabKey(activeKey as TabKeys)}
    />
  );
};
