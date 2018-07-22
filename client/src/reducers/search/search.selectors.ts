import { createSelector } from 'reselect';
import { State } from '../index';

export const getSearchState = (state: State) => state.search;

export const getSearchResults = createSelector(
  getSearchState,
  ({ query, results, entities }) => {
    if (query && results[query]) {
      const ids = results[query];
      return ids.map(id => entities[id]);
    }
    return [];
  }
)
