import { createSelector } from 'reselect';
import { State } from '../index';

export const getHscodeState = (state: State) => state.hscodes;

export const getSearchResults = createSelector(
  getHscodeState,
  ({ query, searchResults, entities }) => {
    if (query && searchResults[query]) {
      const codes = searchResults[query];
      return codes.map((code: string) => entities[code]);
    }
    return [];
  }
)
