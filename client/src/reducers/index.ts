import { combineReducers } from 'redux';

import { countryReducer, CountryState } from './country';
import { searchReducer, SearchState } from './search';

// tslint:disable:interface-name
export interface State {
  countries: CountryState,
  search: SearchState,
}

export const state = combineReducers<State>({
  countries: countryReducer,
  search: searchReducer,
})

// const years = [
//   '2018',
//   '2017',
//   '2016',
//   '2015',
//   '2014',
//   '2013',
//   '2012',
//   '2011',
//   '2010',
//   '2009',
//   '2008',
//   '2007',
//   '2006',
//   '2005',
//   '2004',
//   '2003',
//   '2002',
//   '2001',
//   '2000',
//   '1999',
//   '1998',
//   '1997',
// ];