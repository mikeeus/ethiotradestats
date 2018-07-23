import { combineReducers } from 'redux';

import { countryReducer, CountryState } from './country';
import { homeReducer, HomeState } from './home';
import { hscodeReducer, HscodeState } from './hscode';

// tslint:disable:interface-name
export interface State {
  countries: CountryState,
  home: HomeState,
  hscodes: HscodeState,
}

export const state = combineReducers<State>({
  countries: countryReducer,
  home: homeReducer,
  hscodes: hscodeReducer,
})
