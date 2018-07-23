import * as React from 'react';

import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

interface IProps {
  data: any;
}

export class BasicChart extends React.Component<IProps> {
  public render() {
    return (
      <BarChart width={600} height={300} data={this.props.data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    )
  }
}

export default BasicChart
