import {PanelPlugin} from '@grafana/ui';

import {AntdEditor} from './AntdEditor';
import {AntdPanel} from './AntdPanel';
import {Options, defaults} from './types';

export const plugin = new PanelPlugin<Options>(AntdPanel)
  .setDefaults(defaults)
  .setEditor(AntdEditor);
