// tslint:disable:max-classes-per-file
// tslint:disable:interface-name

import axios, { AxiosResponse } from 'axios';

import { Hscode } from '@models';

export enum ActionTypes {
  SEARCH = '[Hscode] Search',
  SEARCH_SUCCESS = '[Hscode] Search Success',
  SEARCH_FAIL = '[Hscode] Search Fail',

  LOAD = '[Hscode] Load',
  LOAD_SUCCESS = '[Hscode] Load Success',
  LOAD_FAIL = '[Hscode] Load Fail',
}

/*
 * Search Hscodes
 */
export const searchHscodes = (query: string) => (dispatch: any) => {
  if (query.length < 3) {
    return;
  }

  dispatch(requestHscodesSearch(query));

  axios
    .get('/api/hscodes/search/' + encodeURIComponent(query))
    .then((res: AxiosResponse<Hscode[]>) => {
      dispatch(searchHscodesSuccess(res.data));
    })
    .catch(err => dispatch(searchHscodesFail));
};

const requestHscodesSearch = (query: string): Search => ({
  payload: query,
  type: ActionTypes.SEARCH,
});
const searchHscodesSuccess = (hscodes: Hscode[]): SearchSuccess => ({
  payload: hscodes,
  type: ActionTypes.SEARCH_SUCCESS,
});
const searchHscodesFail: SearchFail = {
  type: ActionTypes.SEARCH_FAIL
};

interface Search {
  payload: string,
  type: ActionTypes.SEARCH,
}
interface SearchSuccess {
  payload: Hscode[],
  type: ActionTypes.SEARCH_SUCCESS,
}
interface SearchFail {
  type: ActionTypes.SEARCH_FAIL,
}


/*
 * Load Hscode
 */
export const loadHscode = (code: string) => (dispatch: any) => {
  dispatch(requestLoadHscode(code));

  axios
    .get('/api/hscodes/' + code)
    .then((res: AxiosResponse<{ hscode: Hscode }>) => {
      dispatch(loadHscodeSuccess(res.data));
    })
    .catch(err => dispatch(loadHscodeFail));
};

const requestLoadHscode = (code: string): Load => ({
  payload: code,
  type: ActionTypes.LOAD,
});
const loadHscodeSuccess = (res: { hscode: Hscode }): LoadSuccess => ({
  payload: res,
  type: ActionTypes.LOAD_SUCCESS,
});
const loadHscodeFail: LoadFail = {
  type: ActionTypes.LOAD_FAIL
};

interface Load {
  payload: string,
  type: ActionTypes.LOAD,
}
interface LoadSuccess {
  payload: { hscode: Hscode },
  type: ActionTypes.LOAD_SUCCESS,
}
interface LoadFail {
  type: ActionTypes.LOAD_FAIL,
}

export type HscodeActions =
  | Load
  | LoadSuccess
  | LoadFail

  | Search
  | SearchSuccess
  | SearchFail;
