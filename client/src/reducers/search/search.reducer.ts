import { ActionTypes, SearchActions } from './search.actions';

import { Hscode } from '@models';

// tslint:disable:interface-name
export interface SearchState {
  term: string,
  results: Hscode[],
  loading: boolean,
}

export const initialState: SearchState = {
  loading: false,
  results: [],
  term: '',
};

export const searchReducer = (state: SearchState = initialState, action: SearchActions) => {
  switch (action.type) {
    case ActionTypes.SEARCH: {
      return {
        ...state,
        loading: true
      }
    }
    case ActionTypes.SEARCH_SUCCESS: {
      const results = action.payload;

      return {
        ...state,
        loading: false,
        results,
      }
    }
    case ActionTypes.SEARCH_FAIL: {
      return {
        ...state,
        loading: false
      }
    }
  }

  return state;
};
