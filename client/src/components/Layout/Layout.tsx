import * as React from 'react'

import { Header } from '@components';
import { colors } from '@constants';
import { Layout as AntLayout } from 'antd';

import './Layout.css';

const { Content, Footer, Sider } = AntLayout;

export class Layout extends React.Component {
  public render() {
    return (
      <AntLayout className="layout"
        style={{
          background: colors.primary,
        }}>
        <Header/>
        <AntLayout>
          <Content style={{
            background: colors.secondary,
            minHeight: '100vh',
            padding: '0 50px',
          }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            {this.props.children}
          </Content>
          <Sider
            style={{
              background: colors.secondary,
            }}>
            Sider
          </Sider>
        </AntLayout>
        <Footer style={{ textAlign: 'center' }}>
          Ethio Trade Stats ©2016 Created by <a href="https://mikias.net">Mikias Abera</a>
        </Footer>
      </AntLayout>
    )
  }
}

export default Layout
