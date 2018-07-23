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
  annualTotals: any;
  loadCountry(country: string): void;
}

const mapStateToProps = (state: State & { router: RouterState }) => {
  const countryName = state.router.location.pathname.replace('/country/', '');
  return {
    annualTotals: state.countries.annualTotals[countryName],
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

    const chart = this.props.annualTotals
        ? <BasicChart
            xAxisKey="year"
            keys={[
              { key: 'totalImports', id: 'Imports' },
              { key: 'totalExports', id: 'Exports' }
            ]}
            data={this.props.annualTotals}/>
        : null;

    return (
      <div>
        <h1 style={{ fontSize: '3.5em'}}>{ this.props.country && this.props.country.name }</h1>
        { chart }
      </div>
    )
  }
}

export const CountryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
