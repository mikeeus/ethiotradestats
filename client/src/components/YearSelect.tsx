import * as React from 'react';

import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

/**
 * Renders a dropdown menu with a list of years from 1997 to 2018
 * which link to /year/<year>.
 */
export class YearSelect extends React.Component {
  public render() {
    const menuItems = [];

    for (let i = 2018; i >= 1997; i--) {
      menuItems.push(
        <Menu.Item>
          <Link to={"/year/" + i}
            style={{
              fontWeight: 'bold'
            }}
          >
            {i}
          </Link>
        </Menu.Item>        
      )
    }

    const menu = (
      <Menu
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          textAlign: 'center',
        }}
      >
        {menuItems}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link"
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          Select Year <Icon type="down" />
        </a>
      </Dropdown>
    )
  }
}

export default YearSelect
