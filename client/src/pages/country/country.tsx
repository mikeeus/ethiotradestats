import * as React from 'react'
import { connect } from 'react-redux';

import { loadCountry } from '@store/country';
import { State } from '@store/index';

interface IProps {
  match: { params: { country: string }},
  getCountry(country: string): void;
}

const mapStateToProps = (state: State) => ({
  ...state.countries
});

const mapDispatchToProps = (dispatch: any) => ({
  getCountry: (country: string) => dispatch(loadCountry(country))
})

export class Component extends React.Component<IProps> {
  public componentDidMount() {
    const { match, getCountry } = this.props;
    getCountry(match.params.country);
  }

  public render() {
    const { match } = this.props;

    return (
      <div>
        Country: { match.params.country }
      </div>
    )
  }
}

export const Country = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
