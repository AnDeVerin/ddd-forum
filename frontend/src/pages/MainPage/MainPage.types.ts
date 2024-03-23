import { TabPaneProps } from 'antd';
import { ReactNode } from 'react';

import { TabKeys } from './MainPage.constants';

export interface PostsTab extends Omit<TabPaneProps, 'tab'> {
  key: TabKeys;
  label: ReactNode;
}
