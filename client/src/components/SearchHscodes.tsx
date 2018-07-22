import * as React from 'react'

import { Hscode } from '@models';
import { AutoComplete } from 'antd';

interface IProps {
  results: Hscode[];
  onSelect(value: string, option: any): void;
  onSearch(query: string): void;
}
export class SearchHscodes extends React.Component<IProps> {
  public render() {
    return (
      <AutoComplete
        onSearch={this.props.onSearch}
        onSelect={this.props.onSelect}
        placeholder="Search products (eg: Coffee)"
      >
        {
          this.props.results.map(result => 
            <AutoComplete.Option key={result.code}>
              { result.description }
            </AutoComplete.Option>
          )
        }
      </AutoComplete>
    )
  }
}

