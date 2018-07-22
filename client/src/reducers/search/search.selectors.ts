import { createSelector } from 'reselect';
import { State } from '../index';

export const getSearchState = (state: State) => state.search;

export const getSearchResults = createSelector(
  getSearchState,
  ({ query, results }) => {
    if (query && results[query]) {
      return results[query];
    }
    return [];
  }
)
