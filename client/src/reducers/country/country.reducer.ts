import { ActionTypes, CountryActions } from './country.actions';

import { Country } from '@models';

// tslint:disable:interface-name
export interface CountryState {
  allCountries: string[];
  fetchedCountries: Country[];
  loading: boolean;
  loadingNames: boolean;
  selected: Country | null;
}

const initialState: CountryState = {
  allCountries: [
    'Canada',
    'China',
    'USA',
    'Germany',
    'Somalia',
  ],
  fetchedCountries: [],
  loading: false,
  loadingNames: false,
  selected: null,
};

export const countryReducer = (state: CountryState = initialState, action: CountryActions) => {
  switch (action.type) {
    case ActionTypes.LOAD: {
      return {
        ...state,
        loading: true
      }
    }
    case ActionTypes.LOAD_SUCCESS: {
      const country = action.payload;

      return {
        ...state,
        fetchedCountries: [...state.fetchedCountries, country],
        loading: false
      }
    }
    case ActionTypes.LOAD_FAIL: {
      return {
        ...state,
        loading: true
      }
    }

    case ActionTypes.LOAD_NAMES: {
      return {
        ...state,
        loadingNames: true
      }
    }
    case ActionTypes.LOAD_NAMES_SUCCESS: {
      const names = action.payload;

      return {
        ...state,
        allCountries: names,
        loadingNames: false
      }
    }
    case ActionTypes.LOAD_FAIL: {
      return {
        ...state,
        loadingNames: false
      }
    }

    default:
      return state;
  }
};
