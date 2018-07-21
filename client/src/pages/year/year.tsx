import * as React from 'react'

interface IProps {
  match: { params: { year: number }}
}

export class Year extends React.Component<IProps> {
  public render() {
    const { match } = this.props;

    return (
      <div>
        Year: { match.params.year }
      </div>
    )
  }
}

export default Year
