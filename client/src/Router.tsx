import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { App } from './App';
import { store } from './store';

import { Country, Home, Hscode, Year } from '@pages';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Route path="/hscode/:code" component={Hscode}/>
          <Route path="/year/:year" component={Year}/>
          <Route path="/country/:country" component={Country}/>
          <Route exact={true} path="/" component={Home}/>
        </App>
      </BrowserRouter>
    </Provider>
  );
}
