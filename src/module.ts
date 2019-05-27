import { PanelPlugin } from '@grafana/ui';
import { AntdPanel } from './components/AntdPanel';
import { AntdPanelEditor } from './components/AntdPanelEditor';
import { defaults, Options } from './types';


import './lib/cleanslate.css!';
import './lib/antd.css!';
import './lib/antd.min';


export const plugin = new PanelPlugin<Options>(AntdPanel)
  .setDefaults(defaults)
  .setEditor(AntdPanelEditor);
