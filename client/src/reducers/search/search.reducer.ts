import { ActionTypes, SearchActions } from './search.actions';

import { Hscode } from '@models';

// tslint:disable:interface-name
export interface SearchState {
  loading: boolean,
  query: string,
  entities: { [key: string]: Hscode },
  results: { [key: string]: string[] },
}

export const initialState: SearchState = {
  entities: {},
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

      const resultEntities = {}
      results.map(hscode => {
        resultEntities[hscode.code] = hscode
      });
      
      return {
        ...state,
        entities: entitiesToHash<Hscode>(results, 'code'),
        loading: false,
        results: {
          ...state.results,
          [state.query]: results.map(hscode => hscode.code)
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

/**
 * entitiesToHash converts an array of entities into a hash store using
 * a unique key.
 * @param entities an array of entities to turn into a hash store.
 * @param key a unique key to use in the hash
 */
function entitiesToHash<T>(entities: T[], key: string = 'id'): {[key: string]: T} {
  const result = {};

  entities.map(entity => {
    result[entity[key]] = entity;
  })

  return result;
}