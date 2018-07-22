import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, Store,  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import { connectRouter, routerMiddleware } from 'connected-react-router';

import { state, State } from './reducers';

export const history = createBrowserHistory();

export const store: Store<State> = createStore(
  connectRouter(history)(state),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      reduxThunk,
    ),
  )
);
