import * as React from 'react'

interface IProps {
  match: { params: { code: number }}
}

export class Hscode extends React.Component<IProps> {
  public render() {
    const { match } = this.props;

    return (
      <div>
        Code: { match.params.code }
      </div>
    )
  }
}

export default Hscode
