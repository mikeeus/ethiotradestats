import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { AutoComplete, Layout } from 'antd';

// import { colors } from '@constants';
import { Dropdown } from '@components';
import { State } from '@store/index';

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

const years = [
  { label: '2018', link: '2018' },
  { label: '2017', link: '2017' },
  { label: '2016', link: '2016' },
  { label: '2015', link: '2015' },
  { label: '2014', link: '2014' },
  { label: '2013', link: '2013' },
  { label: '2012', link: '2012' },
  { label: '2011', link: '2011' },
  { label: '2010', link: '2010' },
  { label: '2009', link: '2009' },
  { label: '2008', link: '2008' },
  { label: '2007', link: '2007' },
  { label: '2006', link: '2006' },
  { label: '2005', link: '2005' },
  { label: '2004', link: '2004' },
  { label: '2003', link: '2003' },
  { label: '2002', link: '2002' },
  { label: '2001', link: '2001' },
  { label: '2000', link: '2000' },
  { label: '1999', link: '1999' },
  { label: '1998', link: '1998' },
  { label: '1997', link: '1997' },
];

const mapStateToProps = (state: State) => ({
  allCountries: state.countries.allCountries,
});

interface IProps {
  allCountries: string[];
}

const HeaderComponent = withRouter<RouteComponentProps<{}> & IProps>(
  class extends React.Component<RouteComponentProps<{}> & IProps, any> {
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
          dataSource={this.props.allCountries}
          onSelect={this.onCountrySelect}
          style={{
            marginRight: '15px',
            width: '300px',
          }}
        />
        <Dropdown label="Select Year" options={years} urlPrefix="/year"/>
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

export const Header = connect(
  mapStateToProps,
  null
)(HeaderComponent)
