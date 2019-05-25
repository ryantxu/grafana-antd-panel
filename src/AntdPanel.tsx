// Libraries
import React, {PureComponent} from 'react';

// Types
import {Options} from './types';
import {PanelProps} from '@grafana/ui';

import {Card} from 'antd';

export interface Props extends PanelProps<Options> {}

interface State {
  height: number;
  time: number;
  up: boolean;
  running: boolean;
}

export class AntdPanel extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      height: props.options.min,
      time: Date.now(),
      up: true,
      running: false,
    };
  }

  render() {
    return (
      <div>
        HELLO Antd!!!!
        <div style={{background: '#ECECEC', padding: '30px'}}>
          <Card title="Card title" bordered={false} style={{width: 300}}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
        ,
      </div>
    );
  }
}
