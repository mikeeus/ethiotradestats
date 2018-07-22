// tslint:disable:interface-name
// // tslint:disable:max-classes-per-file

// import { Action } from 'redux';

import axios, { AxiosResponse } from 'axios';

import { AnnualExport, AnnualImport, Country,  } from '@models';

export enum ActionTypes {
  LOAD_NAMES = '[Country] Load Names',
  LOAD_NAMES_SUCCESS = '[Country] Load Names Success',
  LOAD_NAMES_FAIL = '[Country] Load Names Fail',

  LOAD = '[Country] Load',
  LOAD_SUCCESS = '[Country] Load Success',
  LOAD_FAIL = '[Country] Load Fail',
}

/*
 * Load Country Names
 */
export const loadCountryNames = () => (dispatch: any) => {
  dispatch(requestCountryNames);

  axios.get('/api/countries')
    .then((res: AxiosResponse<string[]>) => {
      dispatch(loadCountryNamesSuccess(res.data));
    })
    .catch(err => dispatch(loadCountryNamesFail));
};

const requestCountryNames = {
  type: ActionTypes.LOAD_NAMES
};
const loadCountryNamesSuccess = (names: string[]): LoadCountryNamesSuccess => ({
  payload: names,
  type: ActionTypes.LOAD_NAMES_SUCCESS,
});
const loadCountryNamesFail = {
  type: ActionTypes.LOAD_NAMES_FAIL
}

interface LoadCountryNames {
  type: ActionTypes.LOAD_NAMES,
}
interface LoadCountryNamesSuccess {
  payload: string[],
  type: ActionTypes.LOAD_NAMES_SUCCESS,
}
interface LoadCountryNamesFail {
  type: ActionTypes.LOAD_NAMES_FAIL,
}


interface CountrySuccessResponse {
  country: Country,
  annualImports: AnnualImport[],
  annualExports: AnnualExport[]
}
/*
 * Load Country
 */
export const loadCountry = (name: string) => (dispatch: any) => {
  dispatch(requestCountry);

  axios.get('/api/countries/' + name)
    .then((res: AxiosResponse<CountrySuccessResponse>) => {
      dispatch(loadCountrySuccess(res.data));
    })
    .catch(err => dispatch(loadCountryFail));
};

const requestCountry: LoadCountry = {
  type: ActionTypes.LOAD
}
const loadCountrySuccess = (res: CountrySuccessResponse): LoadCountrySuccess => ({
  payload: res,
  type: ActionTypes.LOAD_SUCCESS,
});
const loadCountryFail: LoadCountryFail = {
  type: ActionTypes.LOAD_FAIL
}

interface LoadCountry {
  type: ActionTypes.LOAD,
}
interface LoadCountrySuccess {
  payload: CountrySuccessResponse,
  type: ActionTypes.LOAD_SUCCESS,
}
interface LoadCountryFail {
  type: ActionTypes.LOAD_FAIL,
}

export type CountryActions =
 | LoadCountryNames
 | LoadCountryNamesSuccess
 | LoadCountryNamesFail

 | LoadCountry
 | LoadCountrySuccess
 | LoadCountryFail;
