import { ActionTypes, SearchActions } from './search.actions';

import { Hscode } from '@models';

// tslint:disable:interface-name
export interface SearchState {
  loading: boolean,
  query: string,
  results: { [key: string]: Hscode[] },
}

export const initialState: SearchState = {
  loading: false,
  query: '',
  results: {},
};

export const searchReducer = (state: SearchState = initialState, action: SearchActions): SearchState => {
  switch (action.type) {
    case ActionTypes.SEARCH_HSCODES: {
      const query = action.payload;

      return {
        ...state,
        loading: true,
        query,
      }
    }
    case ActionTypes.SEARCH_HSCODES_SUCCESS: {
      const results = action.payload;

      return {
        ...state,
        loading: false,
        results: {
          ...state.results,
          [state.query]: results
        },
      }
    }
    case ActionTypes.SEARCH_HSCODES_FAIL: {
      return {
        ...state,
        loading: false
      }
    }

    default:
      return state;
  }
};
