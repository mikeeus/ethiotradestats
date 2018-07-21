import React, { Component } from 'react'

export class Hscode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const  { match } = this.props;

    return (
      <div>
        Hscode: {match.params.id}
      </div>
    )
  }
}

export default Hscode
