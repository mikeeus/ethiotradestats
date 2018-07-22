import * as React from 'react'
import { connect } from 'react-redux';

import { CountryState, loadCountry } from '@store/country';
import { State } from '@store/index';

interface IProps extends CountryState {
  match: { params: { country: string }},
  loadCountry(country: string): void;
}

const mapStateToProps = (state: State) => ({
  ...state.countries
});

const mapDispatchToProps = (dispatch: any) => ({
  loadCountry: (country: string) => dispatch(loadCountry(country))
})

export class Component extends React.Component<IProps> {
  public componentDidMount() {
    const { match } = this.props;
    this.props.loadCountry(match.params.country);
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
