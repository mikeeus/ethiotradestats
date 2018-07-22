import * as React from 'react'
import { connect } from 'react-redux';

import { Hscode as HscodeModel } from '@models';
import { loadHscode } from '@store/hscode';
import { State } from '@store/index';

const mapStateToProps = (state: State) => ({
  entities: state.hscodes.entities,
})

const mapDispatchToProps = (dispatch: any) => ({
  getHscode: (code: string) => dispatch(loadHscode(code)),
})

interface IProps {
  match: { params: { code: string }};
  entities: {[key: string]: HscodeModel };
  getHscode(code: string): void;
}

export class Component extends React.Component<IProps> {
  public state: { hscode: HscodeModel }

  public componentWillReceiveProps(nextProps: IProps) {
    const { match } = nextProps;
    const newCode = match.params.code;

    const newHscode = this.props.entities[newCode];
    const oldHscode = this.state ? this.state.hscode : null;

    if (newHscode && newHscode !== oldHscode) {
      this.setState({ hscode: newHscode })
    } else {
      this.props.getHscode(match.params.code);
    }
  }

  public componentDidMount() {
    const { entities, match } = this.props;
    const hscode = entities[match.params.code];

    if (hscode) {
      this.setState({ hscode })
    } else {
      this.props.getHscode(match.params.code);
    }
  }

  public render() {
    const hscode = this.state ? this.state.hscode : null;
    return (
      <div>
        Code: { hscode ? hscode.code : null }
      </div>
    )
  }
}

export const Hscode = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
