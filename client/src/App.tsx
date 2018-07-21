import * as React from 'react';
import './App.css';

import { Layout } from '@components';
export const App: React.StatelessComponent<{}> = (props) => {
  return (
    <Layout>
      {props.children}
    </Layout>
  )
}
