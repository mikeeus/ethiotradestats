import * as React from 'react'
import { connect } from 'react-redux';

import { Hscode as HscodeModel } from '@models';
import { loadHscode, selectHscode } from '@store/hscode';

const mapStateToProps = (state: any) => ({
  hscode: selectHscode(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  getHscode: (code: string) => dispatch(loadHscode(code))
})

interface IProps {
  match: { params: { code: string }}
  hscode: HscodeModel | null;
  getHscode(code: string): void;
}

export class Component extends React.Component<IProps> {
  // tslint:disable:no-console
  public componentDidMount() {
    const { hscode, match } = this.props;
    if (!hscode) {
      this.props.getHscode(match.params.code);
    }
  }

  public render() {
    const { match } = this.props;
    return (
      <div>
        Code: { match.params.code }
        hscode: { this.props.hscode && this.props.hscode.description }
      </div>
    )
  }
}

export const Hscode = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
