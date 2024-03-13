import { ReactNode } from 'react';
import { TabPaneProps } from 'antd';

export type ActiveTabKeys = 'popular' | 'recent';

export interface PostsTab extends Omit<TabPaneProps, 'tab'> {
  key: ActiveTabKeys;
  label: ReactNode;
}
