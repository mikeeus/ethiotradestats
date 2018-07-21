import * as React from 'react';

import { Dropdown as AntDropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

interface IProps {
  label: string,
  options: Array<{label: string; link: string; }>,
  urlPrefix: string,
}

/**
 * Renders a dropdown menu with a list of years from 1997 to 2018
 * which link to /year/<year>.
 */
export class Dropdown extends React.Component<IProps> {
  public render() {
    const menuItems = this.props.options.map(option => {
      return (
        <Menu.Item
          key={option.label}>
          <Link
            to={this.props.urlPrefix + '/' + option.link}
            style={{ fontWeight: 'bold' }}
          >
            {option.label}
          </Link>
        </Menu.Item>
      )
    })

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
      <AntDropdown overlay={menu}>
        <a className="ant-dropdown-link"
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          {this.props.label} <Icon type="down" />
        </a>
      </AntDropdown>
    )
  }
}

export default Dropdown
