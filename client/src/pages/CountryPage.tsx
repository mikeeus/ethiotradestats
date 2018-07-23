import * as React from 'react'
import { connect } from 'react-redux';

import { RouterState } from 'connected-react-router';

import { BasicChart } from '@components';
import { Country } from '@models';
import { CountryState, loadCountry } from '@store/country';
import { State } from '@store/index';

import { dispatchIfChanged } from './helpers';

interface IProps extends CountryState {
  match: { params: { country: string }};
  country: Country;
  annualSummary: any;
  loadCountry(country: string): void;
}

const mapStateToProps = (state: State & { router: RouterState }) => {
  const countryName = state.router.location.pathname.replace('/country/', '');
  return {
    annualSummary: state.countries.annualSummaries[countryName],
    country: state.countries.entities[countryName],
    entities: state.countries.entities,
    loading: state.countries.loading,
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  loadCountry: (country: string) => dispatch(loadCountry(country))
})

export class Component extends React.Component<IProps> {
  public state: { country: Country}
  
  public componentDidMount() {
    this.props.loadCountry(this.props.match.params.country);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    dispatchIfChanged(nextProps, this.props, 'country', 
      this.props.loadCountry, this.props.loading);
  }

  public render() {
    return (
      <div>
        Country: { this.props.country && this.props.country.name }
        {
          this.props.annualSummary ? <BasicChart data={this.props.annualSummary}/> : null
        }
      </div>
    )
  }
}

export const CountryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
