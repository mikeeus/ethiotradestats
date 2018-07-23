import { ActionTypes, HomeActions } from './home.actions';

import { AnnualCountryTotal } from '@models';

// tslint:disable:interface-name
export interface HomeState {
  annualTotals: {
    [key: string]: AnnualCountryTotal
  };
  loading: boolean;
}

const initialState: HomeState = {
  annualTotals: {},
  loading: false,
};

export const homeReducer = (state: HomeState = initialState, action: HomeActions) => {
  switch (action.type) {
    case ActionTypes.LOAD_ANNUAL_TOTALS: {
      return {
        ...state,
        loading: true
      }
    }
    case ActionTypes.LOAD_ANNUAL_TOTALS_SUCCESS: {
      const { year, annualTotals } = action.payload;

      return {
        ...state,
        annualTotals: {
          ...state.annualTotals,
          [year]: annualTotals
        },
        loading: false
      }
    }
    case ActionTypes.LOAD_ANNUAL_TOTALS_FAIL: {
      return {
        ...state,
        loading: false
      }
    }

    default:
      return state;
  }
};
