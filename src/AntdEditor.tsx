// Libraries
import React, {PureComponent, ChangeEvent} from 'react';

// Components
import {PanelEditorProps, PanelOptionsGroup, FormField, toNumberString} from '@grafana/ui';

// Types
import {Options} from './types';

export class AntdEditor extends PureComponent<PanelEditorProps<Options>> {
  onMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(event.target.value);
    this.props.onOptionsChange({...this.props.options, min: isNaN(v) ? 100 : v});
  };

  onMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(event.target.value);
    this.props.onOptionsChange({...this.props.options, max: isNaN(v) ? 500 : v});
  };

  onSpeedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(event.target.value);
    this.props.onOptionsChange({...this.props.options, speed: isNaN(v) ? 150 : v});
  };

  render() {
    const {options} = this.props;
    const labelWidth = 6;

    return (
      <PanelOptionsGroup title="Dynamic Height">
        <FormField
          label="Min"
          labelWidth={labelWidth}
          onChange={this.onMinChange}
          value={toNumberString(options.min)}
          type="number"
        />

        <FormField
          label="Max"
          labelWidth={labelWidth}
          onChange={this.onMaxChange}
          value={toNumberString(options.max)}
          type="number"
        />

        <FormField
          label="Speed"
          labelWidth={labelWidth}
          onChange={this.onSpeedChange}
          value={toNumberString(options.speed)}
          type="number"
          step={0.1}
          min={10}
          max={1000}
          tooltip={'pixels/second'}
        />
      </PanelOptionsGroup>
    );
  }
}
