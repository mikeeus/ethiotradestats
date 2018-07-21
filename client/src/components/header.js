import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

// Material-UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase';

import { backgroundColor } from '../styleVariables';

// Components
import IntegrationAutosuggest from './integrationAutosuggest';
import SimpleMenu from './menu';

const appBarHeight = '64px';

const classes = {
  AppBar: {
    background: '#222548',
    alignItems: 'center'
  },
  Toolbar: {
    display: 'flex',
    width: '100%',
    padding: '0 15px',
    boxSizing: 'border-box',
  },
  Title: {
    fontSize: '15px',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
  ButtonBase: {
    height: appBarHeight,
    lineHeight: appBarHeight,
    padding: '0 15px',
    color: 'white',
    fontWeight: 'bold'
  },
  hoverVisible: {
    background: backgroundColor,
  }
}

export class Header extends Component {
  render() {
    return (
      <AppBar position="static" color="#222548"
        style={classes.AppBar}>
        <Toolbar style={classes.Toolbar}>
          <Typography variant="title" color="inherit"
            style={classes.Title}>
            Ethio Trade Stats
          </Typography>

          <div style={{flex: 1}}></div>

          <IntegrationAutosuggest />

          <div style={{flex: 1}}></div>

          <SimpleMenu
            options={[{link: '/year/2018', label: '2018'}]}
            menuLabel="Year"/>

          <ButtonBase
            focusRipple
            style={classes.ButtonBase}
            focusVisibleClassName={classes.focusVisible}
            hoverVisibleClassName={classes.hoverVisible}
          >
            Hscode 1
          </ButtonBase>
          
          <ul>
            <NavLink to="/hscode/1">Hscode 1</NavLink>
            <NavLink to="/year/2017">Year 2017</NavLink>
          </ul>
        </Toolbar>
      </AppBar>
    )
  }
}
{/* <header>

  <div className="push" style={flex}></div>

  <nav>
    <ul>
      <NavLink to="/hscode/1">Hscode 1</NavLink>
      <NavLink to="/year/2017">Year 2017</NavLink>
    </ul>
  </nav>
</header> */}

export default Header
