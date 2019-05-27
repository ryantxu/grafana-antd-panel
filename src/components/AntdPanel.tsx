import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/ui';

import { Avatar, Badge } from 'antd';

import { Options } from '../types';

interface Props extends PanelProps<Options> {}

interface State {}

export class AntdPanel extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        Antd!!!!...
        <div>
          <span style={{ marginRight: 24 }}>
            <Badge count={1}>
              <Avatar shape="square" icon="user" />
            </Badge>
          </span>
          <span>
            <Badge dot>
              <Avatar shape="square" icon="user" />
            </Badge>
          </span>
        </div>
      </div>
    );
  }
}
