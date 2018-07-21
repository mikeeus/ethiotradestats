import { Search } from './search.actions';
import { initialState, searchReducer } from './search.reducer';

describe('searchReducer', () => {
  it('Search should set terma and start loading', () => {
    const action: Search = new Search('term');
    const actual = searchReducer(initialState, action);
    expect(actual).toEqual({
      ...initialState,
      loading: true,
      term: 'term',
    });
  });
});
