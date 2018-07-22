import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import { App } from './App';
import { history, store } from './store';

import { CountryPage, Home, Hscode, Year } from '@pages';


export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route path="/hscode/:code" component={Hscode}/>
          <Route path="/year/:year" component={Year}/>
          <Route path="/country/:country" component={CountryPage}/>
          <Route exact={true} path="/" component={Home}/>
        </App>
      </ConnectedRouter>
    </Provider>
  );
}
