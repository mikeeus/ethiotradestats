import * as React from 'react'

interface IProps {
  match: { params: { country: number }}
}

export class Country extends React.Component<IProps> {
  public render() {
    const { match } = this.props;

    return (
      <div>
        Country: { match.params.country }
      </div>
    )
  }
}

export default Country
