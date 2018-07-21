import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Layout } from 'antd';
import { colors } from '../constants';

const AntHeader = Layout.Header;

const styles = {
  activeHeaderLink: {
    background: colors.secondary,
  },
  headerLink: {
    color: 'white',
    display: 'inline-block',
    fontSize: 13,
    fontWeight: 400,
    height: 64,
    lineHeight: '64px',
    padding: '0 15px',
    textDecoration: 'none',
  },
}

export class Header extends React.Component {
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
          Ethio Trade Stats
        </div>
        {/* <Menu
          theme="dark"
          mode="horizontal"
          style={{
            background: colors.primary,
            border: '0',
            height: '64px',
            lineHeight: '64px',
            overflow: 'hidden',
            padding: '0',
          }}
        > */}
        <NavLink to="/trade"
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
        </NavLink>
      </AntHeader>
    )
  }
}

// class Header extends React.Component {
//   public render() {
//     return (
//     )
//   }
// }

export default Header

