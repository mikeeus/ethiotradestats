// tslint:disable:max-classes-per-file
import * as React from 'react';

import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatCurrency, formatCurrencyTicks } from '@shared';

interface IProps {
  data: any;
  xAxisKey: string;
  keys: Array<{ key: string, id: string }>;
}


// interface ITooltipProps {
//   label: string;
//   payload: any[];
//   type: string;
//   active: boolean;
// }

class CustomTooltip extends React.Component<any> {
  public render() {
    const { active } = this.props;
  
    if (active) {
      const { payload, label } = this.props;
      return (
        <div style={{ background: '#0f202f', color: 'white', padding: '10px' }}>
          <h4>{label}</h4>
          <p style={{color: '#00bcd4'}}>
            <strong>Imports:</strong> ${formatCurrency(payload[0].value)}
          </p>
          <p style={{color: '#cddc39'}}>
            <strong>Exports:</strong> ${formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
};

export class BasicChart extends React.Component<IProps> {
  public render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={this.props.data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis
            tick={{ strokeWidth: 0.5}}
            tickFormatter={formatCurrencyTicks}
            dataKey={this.props.xAxisKey}/>
          <YAxis
            tick={{ strokeWidth: 0.5}}
            tickFormatter={formatCurrencyTicks}/>
          <Tooltip
            content={<CustomTooltip />}
            labelStyle={{ background: '#0f202f', color: 'white' }}
          />
          <Legend />
          <Area
            dot={false}
            dataKey="totalImports"
            name="Imports"
            type="monotone"
            fill="#00bcd4"
            stroke="#00bcd4"
            strokeWidth={4}/>
          <Area
            dot={false}
            dataKey="totalExports"
            name="Exports"
            type="monotone"
            fill="#cddc39"
            stroke="#cddc39"
            strokeWidth={3}/>
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default BasicChart
