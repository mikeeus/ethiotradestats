import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { YearSelect } from '@components';
// import { colors } from '@constants';
import { AutoComplete, Layout } from 'antd';

const AntHeader = Layout.Header;

// const styles = {
//   activeHeaderLink: {
//     background: colors.secondary,
//   },
//   headerLink: {
//     color: 'white',
//     display: 'inline-block',
//     fontSize: 13,
//     fontWeight: 400,
//     height: 64,
//     lineHeight: '64px',
//     padding: '0 15px',
//     textDecoration: 'none',
//   },
// }
const dataSource = ['Canada', 'China', 'Eritrea'];

export const Header = withRouter<RouteComponentProps<{}>>(
  class MyComponent extends React.Component<RouteComponentProps<{}>, any> {
    public onCountrySelect = (value: any, option: any) => {
      this.props.history.push('/country/' + value);
    }

    public render() {
      return (
        <AntHeader>
        <div className="logo" style={{
          color: 'white',
          float: 'left',
          fontSize: '13px',
          fontWeight: 'bold',
          height: '64px',
          lineHeight: '64px',
          margin: '0',
          textTransform: 'uppercase',
          width: '150px',
        }}>
          <Link to="/">Ethio Trade Stats</Link>
        </div>
        <AutoComplete
          dataSource={dataSource}
          onSelect={this.onCountrySelect}
          style={{
            marginRight: '15px',
            width: '300px',
          }}
        />
        <YearSelect />
        {/* <NavLink to="/trade"
          style={styles.headerLink}
          activeStyle={styles.activeHeaderLink}>
          Import/Export
        </NavLink>
        <NavLink to="/stats"
          style={styles.headerLink}
          activeStyle={styles.activeHeaderLink}>
          Statistics
        </NavLink>
        <NavLink to="/news"
          style={styles.headerLink}
          activeStyle={styles.activeHeaderLink}>
          News
        </NavLink> */}
      </AntHeader>
      )
    }
  }
)
