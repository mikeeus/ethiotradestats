import * as React from 'react'
import { connect } from 'react-redux';

import { AnnualCountryTotal } from '@models';
import { loadAnnualTotals } from '@store/home';
import { State } from '@store/index';

import { BasicMap } from '@components';

interface IProps {
  match: { params: { year: number }};
  annualTotals: { [key: string]: AnnualCountryTotal }
  loadAnnualTotals: (year: number) => void
}

const mapStateToProps = (state: State) => ({
  annualTotals: state.home.annualTotals
});

const mapDispatchToProps = (dispatch: any) => ({
  loadAnnualTotals: (year: number) => dispatch(loadAnnualTotals(year))
})
export class Home extends React.Component<IProps> {
  public state = {
    selectedYear: 2017
  }

  public componentDidMount() {
    this.loadAnnualTotals();
  }

  public selectYear = (year: number) => {
    this.setState({
      selectedYear: year
    })
  }

  public render() {
    return (
      <div>
        <BasicMap />
      </div>
    )
  }

  private loadAnnualTotals() {
    this.props.loadAnnualTotals(this.state.selectedYear);
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
