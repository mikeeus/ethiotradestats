import React, { Component } from 'react'

export class Year extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        Year: {match.params.year}
      </div>
    )
  }
}

export default Year
