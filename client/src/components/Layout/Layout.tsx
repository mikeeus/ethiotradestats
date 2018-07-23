import * as React from 'react'

import { Header } from '@components';
import { Layout as AntLayout } from 'antd';
// import { colors } from '@shared';

import './Layout.css';

const { Content, Footer } = AntLayout;

export class Layout extends React.Component {
  public render() {
    return (
      <AntLayout id="layout">
        <Header/>
        <AntLayout>
          <Content
            className="layout-content"
            style={{
              backgroundImage: ' linear-gradient(to right bottom, rgb(0, 21, 41), #20204e',
              minHeight: '100vh',
            }}
          >
            <div className="content-wrapper">
              {this.props.children}
            </div>
          </Content>

          {/* <Sider
            style={{
              background: colors.secondary,
            }}>
            Sider
          </Sider> */}
        </AntLayout>
        <Footer style={{ textAlign: 'center' }}>
          Ethio Trade Stats ©2016 Created by <a href="https://mikias.net">Mikias Abera</a>
        </Footer>
      </AntLayout>
    )
  }
}
