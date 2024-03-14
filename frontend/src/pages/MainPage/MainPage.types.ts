import { TabPaneProps } from 'antd';
import { ReactNode } from 'react';

export type ActiveTabKeys = 'popular' | 'recent';

export interface PostsTab extends Omit<TabPaneProps, 'tab'> {
  key: ActiveTabKeys;
  label: ReactNode;
}
