import { ActionTypes, CountryActions } from './country.actions';

import { Country } from '@models';
import { AnnualExport, AnnualImport } from '@models';

// tslint:disable:interface-name
export interface CountryState {
  allCountries: string[];
  annualSummaries: {
    [key: string]: {
      annualImports: AnnualImport[];
      annualExports: AnnualExport[];
    }
  };
  entities: { [key: string]: Country };
  loading: boolean;
  loadingNames: boolean;
  selectedId: Country | null;
}

const initialState: CountryState = {
  allCountries: [
    'Canada',
    'China',
    'USA',
    'Germany',
    'Somalia',
  ],
  annualSummaries: {},
  entities: {},
  loading: false,
  loadingNames: false,
  selectedId: null,
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
      const { country, annualExports, annualImports } = action.payload;

      return {
        ...state,
        annualSummaries: {
          ...state.annualSummaries,
          [country.name]: {
            annualExports,
            annualImports,
          }
        },
        entities: {
          ...state.entities,
          [country.name]: country,
        },
        loading: false
      }
    }
    case ActionTypes.LOAD_FAIL: {
      return {
        ...state,
        loading: false
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
