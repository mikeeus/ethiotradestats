import { ActionTypes, HscodeActions } from './hscode.actions';

import { Hscode } from '@models';

// tslint:disable:interface-name
export interface HscodeState {
  entities: { [key: string]: Hscode };
  loading: boolean;
  query: string;
  searchResults: { [key: string]: string[] };
  searching: boolean;
  selectedCode: string | null;
}

export const initialState: HscodeState = {
  entities: {},
  loading: false,
  query: '',
  searchResults: {},
  searching: false,
  selectedCode: null,
};

export const hscodeReducer = (state: HscodeState = initialState, action: HscodeActions): HscodeState => {
  switch (action.type) {
    case ActionTypes.SEARCH: {
      const query = action.payload;

      return {
        ...state,
        query,
        searching: true,
      }
    }
    case ActionTypes.SEARCH_SUCCESS: {
      const searchResults = action.payload;

      const resultEntities = {}
      searchResults.map((hscode: Hscode) => {
        resultEntities[hscode.code] = hscode
      });
      
      return {
        ...state,
        entities: entitiesToHash<Hscode>(searchResults, 'code'),
        searchResults: {
          ...state.searchResults,
          [state.query]: searchResults.map((hscode: Hscode) => hscode.code)
        },
        searching: false,
      }
    }
    case ActionTypes.SEARCH_FAIL: {
      return {
        ...state,
        searching: false
      }
    }

    case ActionTypes.LOAD: {
      return {
        ...state,
        loading: true
      }
    }
    case ActionTypes.LOAD_SUCCESS: {
      const { hscode } = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [hscode.code]: hscode,
        },
        loading: false,
        selectedCode: hscode.code,
      }
    }
    case ActionTypes.LOAD_FAIL: {
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