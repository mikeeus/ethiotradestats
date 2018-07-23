// tslint:disable:interface-name
// // tslint:disable:max-classes-per-file

// import { Action } from 'redux';

import axios, { AxiosResponse } from 'axios';

import { AnnualCountryTotal } from '@models';

export enum ActionTypes {
  LOAD_ANNUAL_TOTALS = '[Home] Load Annual Totals',
  LOAD_ANNUAL_TOTALS_SUCCESS = '[Home] Load Annual Totals Success',
  LOAD_ANNUAL_TOTALS_FAIL = '[Home] Load Annual Totals Fail',
}

/*
 * Load LoadAnnualTotals
 */
export const loadAnnualTotals = (year: number) => (dispatch: any) => {
  dispatch(requestLoadAnnualTotals);

  axios.get('/api/annual_totals/countries/year/' + year)
    .then((res: AxiosResponse<LoadAnnualTotalsSuccessResponse>) => {
      dispatch(loadAnnualTotalsSuccess({ ...res.data, year }));
    })
    .catch(err => dispatch(loadAnnualTotalsFail));
};

const requestLoadAnnualTotals: LoadAnnualTotals = {
  type: ActionTypes.LOAD_ANNUAL_TOTALS
}
const loadAnnualTotalsSuccess = (res: LoadAnnualTotalsSuccessResponse): LoadAnnualTotalsSuccess => ({
  payload: res,
  type: ActionTypes.LOAD_ANNUAL_TOTALS_SUCCESS,
});
const loadAnnualTotalsFail: LoadAnnualTotalsFail = {
  type: ActionTypes.LOAD_ANNUAL_TOTALS_FAIL
}

interface LoadAnnualTotalsSuccessResponse {
  year: number;
  annualTotals: AnnualCountryTotal[];
}

interface LoadAnnualTotals {
  type: ActionTypes.LOAD_ANNUAL_TOTALS,
}
interface LoadAnnualTotalsSuccess {
  payload: LoadAnnualTotalsSuccessResponse,
  type: ActionTypes.LOAD_ANNUAL_TOTALS_SUCCESS,
}
interface LoadAnnualTotalsFail {
  type: ActionTypes.LOAD_ANNUAL_TOTALS_FAIL,
}

export type HomeActions =
 LoadAnnualTotals
 | LoadAnnualTotalsSuccess
 | LoadAnnualTotalsFail;
